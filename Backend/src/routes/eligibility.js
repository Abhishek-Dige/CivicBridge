import express from 'express';
import supabase from '../configs/supabase.js';

const router = express.Router();

// Map category names to icon names for frontend
const categoryIconMap = {
  'Education': 'BookOpen',
  'Healthcare': 'Stethoscope',
  'Agriculture': 'Tractor',
  'Employment': 'Briefcase',
  'Women & Child Welfare': 'Baby',
  'Senior Citizen': 'User',
  'Housing': 'Home',
  'Financial Assistance': 'IndianRupee',
};

/**
 * POST /api/eligibility/check
 * 
 * Body: { age, gender, income, state, category }
 * Returns: { totalSchemes, matchedCount, partialCount, results: [...] }
 * 
 * All eligibility data comes from Supabase:
 *   min_age, max_age, income_brackets, eligible_genders, eligible_categories
 *   NULL = open to all (no restriction)
 */
router.post('/check', async (req, res) => {
  try {
    const { age, gender, income, category } = req.body;
    const parsedAge = parseInt(age, 10);

    // Fetch all schemes from Supabase
    const { data: allSchemes, error: dbError } = await supabase
      .from('schemes')
      .select('*')
      .order('id');

    if (dbError) {
      console.error('Supabase error:', dbError);
      return res.status(500).json({ success: false, error: 'Database query failed' });
    }

    const results = [];

    for (const scheme of allSchemes) {
      const criteria = {};
      let totalCriteria = 0;
      let matchedCriteria = 0;

      // 1. Age check
      if (!isNaN(parsedAge)) {
        totalCriteria++;
        const minAge = scheme.min_age ?? 0;
        const maxAge = scheme.max_age ?? 100;
        const ageMatch = parsedAge >= minAge && parsedAge <= maxAge;
        criteria.age = {
          matched: ageMatch,
          detail: ageMatch
            ? `Age ${parsedAge} is within ${minAge}-${maxAge}`
            : `Age ${parsedAge} is outside ${minAge}-${maxAge}`,
        };
        if (ageMatch) matchedCriteria++;
      }

      // 2. Gender check — NULL means open to all
      if (gender) {
        totalCriteria++;
        const eligibleGenders = scheme.eligible_genders
          ? scheme.eligible_genders.split(',').map(g => g.trim().toLowerCase())
          : null;
        const genderMatch = eligibleGenders === null || eligibleGenders.includes(gender.toLowerCase());
        criteria.gender = {
          matched: genderMatch,
          detail: genderMatch
            ? `Gender "${gender}" is eligible`
            : `This scheme is for ${eligibleGenders.join(', ')} only`,
        };
        if (genderMatch) matchedCriteria++;
      }

      // 3. Income check — NULL means open to all
      if (income) {
        totalCriteria++;
        const eligibleIncome = scheme.income_brackets
          ? scheme.income_brackets.split(',').map(i => i.trim())
          : null;
        const incomeMatch = eligibleIncome === null || eligibleIncome.includes(income);
        criteria.income = {
          matched: incomeMatch,
          detail: incomeMatch
            ? `Income bracket "${income}" qualifies`
            : `Income bracket "${income}" does not qualify`,
        };
        if (incomeMatch) matchedCriteria++;
      }

      // 4. Social category check — NULL means open to all
      if (category) {
        totalCriteria++;
        const eligibleCats = scheme.eligible_categories
          ? scheme.eligible_categories.split(',').map(c => c.trim().toLowerCase())
          : null;
        const catMatch = eligibleCats === null || eligibleCats.includes(category.toLowerCase());
        criteria.category = {
          matched: catMatch,
          detail: catMatch
            ? `Category "${category}" is eligible`
            : `This scheme is for ${eligibleCats.join(', ')} categories only`,
        };
        if (catMatch) matchedCriteria++;
      }

      // Calculate match percentage
      const matchPercentage = totalCriteria > 0
        ? Math.round((matchedCriteria / totalCriteria) * 100)
        : 0;

      if (matchPercentage > 0) {
        const tags = scheme.tags ? scheme.tags.split(',').map(t => t.trim()) : [];

        results.push({
          id: scheme.id,
          name: scheme.name,
          description: scheme.description,
          tags,
          iconName: categoryIconMap[scheme.category] || 'BookOpen',
          categoryTitle: scheme.category,
          documentsRequired: scheme.documents_required || null,
          link: scheme.link || null,
          matchPercentage,
          matchedCriteria: Object.entries(criteria)
            .filter(([, v]) => v.matched)
            .map(([k, v]) => ({ criterion: k, detail: v.detail })),
          unmatchedCriteria: Object.entries(criteria)
            .filter(([, v]) => !v.matched)
            .map(([k, v]) => ({ criterion: k, detail: v.detail })),
        });
      }
    }

    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({
      success: true,
      totalSchemes: allSchemes.length,
      matchedCount: results.filter(r => r.matchPercentage === 100).length,
      partialCount: results.filter(r => r.matchPercentage < 100).length,
      results,
    });
  } catch (error) {
    console.error('Eligibility check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process eligibility check',
    });
  }
});

export default router;

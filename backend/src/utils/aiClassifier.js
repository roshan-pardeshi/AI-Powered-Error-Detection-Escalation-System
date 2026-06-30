/**
 * AI Classification Module
 * Simple NLP-based priority classification using keyword analysis
 */

const HIGH_PRIORITY_KEYWORDS = [
  'critical',
  'urgent',
  'down',
  'crash',
  'error',
  'failed',
  'failure',
  'blocked',
  'severe',
  'emergency',
  'cannot',
  'unable',
  'broken',
  'not working',
  'security',
  'breach',
  'data loss',
  'corruption',
  'production'
];

const MEDIUM_PRIORITY_KEYWORDS = [
  'slow',
  'issue',
  'problem',
  'help',
  'assistance',
  'improve',
  'feature',
  'request',
  'performance',
  'lag',
  'delay',
  'bug',
  'incorrect',
  'wrong',
  'needs fix',
  'update'
];

const LOW_PRIORITY_KEYWORDS = [
  'question',
  'info',
  'documentation',
  'enhancement',
  'suggestion',
  'improvement',
  'typo',
  'comment',
  'feedback'
];

/**
 * Calculate priority based on keywords in title and description
 * @param {string} title - Issue title
 * @param {string} description - Issue description
 * @param {string} category - Issue category
 * @returns {string} Priority level (Low, Medium, High)
 */
const classifyPriority = (title, description, category) => {
  try {
    const text = `${title} ${description} ${category}`.toLowerCase();
    
    // Count keyword occurrences
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    HIGH_PRIORITY_KEYWORDS.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highCount += (text.match(regex) || []).length;
    });

    MEDIUM_PRIORITY_KEYWORDS.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      mediumCount += (text.match(regex) || []).length;
    });

    LOW_PRIORITY_KEYWORDS.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      lowCount += (text.match(regex) || []).length;
    });

    // Determine priority based on keyword counts
    if (highCount > mediumCount && highCount > lowCount) {
      return 'High';
    } else if (mediumCount > lowCount && mediumCount >= highCount) {
      return 'Medium';
    } else {
      return 'Low';
    }
  } catch (error) {
    console.error('Priority classification error:', error);
    return 'Medium'; // Default to medium on error
  }
};

/**
 * Get category suggestion based on description
 * @param {string} description - Issue description
 * @returns {string} Suggested category
 */
const suggestCategory = (description) => {
  try {
    const text = description.toLowerCase();
    
    const categories = {
      'Bug': ['bug', 'error', 'crash', 'not working', 'broken', 'failed', 'failure'],
      'Feature Request': ['feature', 'add', 'new', 'implement', 'enhancement', 'request'],
      'Performance': ['slow', 'lag', 'performance', 'speed', 'optimize', 'timeout'],
      'UI/UX': ['ui', 'ux', 'interface', 'design', 'button', 'layout', 'display'],
      'Database': ['database', 'data', 'query', 'sql', 'sql injection', 'connection'],
      'Security': ['security', 'breach', 'vulnerability', 'password', 'authentication', 'access'],
      'Documentation': ['documentation', 'docs', 'readme', 'guide', 'tutorial', 'help']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }

    return 'Other'; // Default category
  } catch (error) {
    console.error('Category suggestion error:', error);
    return 'Other';
  }
};

module.exports = {
  classifyPriority,
  suggestCategory
};

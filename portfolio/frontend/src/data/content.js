// Edit this file to update the whole site. Everything here comes from the resume.
export const profile = {
  name: 'Prathmesh Nandawdekar',
  headline: 'I build machine learning pipelines, from raw data to evaluated models.',
  intro: 'B.Tech Computer Science student and AI/ML intern. I work in Python and Scikit-learn, and I care about reproducible experiments and honest model evaluation.',
  email: 'prath4mesh.work@gmail.com',
  linkedin: 'https://linkedin.com/in/prath4m',
  github: 'https://github.com/Prath4m-cmd',
  resume: '/resume.docx', // swap for '/resume.pdf' after placing a PDF in frontend/public
}
export const about = [
  'I am pursuing a B.Tech in Computer Science at Sanjay Ghodawat Institute (Aug 2023 – Jun 2027).',
  'In Nov–Dec 2025 I interned as an AI/ML engineer at Evostra Ventures, building supervised and unsupervised learning pipelines end to end.',
  'Outside coursework I compete: 1st place for a Hyperloop poster at Impulse 2k24, and a top 5 finish in the Code Crusade programming contest at Nimbus 2k25.',
]
export const skills = [
  ['Languages', ['Java', 'Python', 'C', 'C++', 'SQL']],
  ['Web', ['React.js', 'Tailwind CSS']],
  ['Tools & platforms', ['Git', 'GitHub', 'Linux', 'Docker']],
  ['CS fundamentals', ['Data Structures & Algorithms', 'Object-Oriented Programming', 'DBMS', 'Machine Learning']],
]
export const projects = [
  {
    id: 'student-performance', name: 'Student Performance Analysis', tag: 'End-to-end ML pipeline',
    problem: 'Predict student performance from academic and demographic data.',
    features: ['Data cleaning, feature engineering and model evaluation', 'Benchmarked multiple regression models; tuned with RandomizedSearchCV to pick the best', 'Converted regression outputs into classification labels with precision/recall/F1 reports', 'Automated ingestion, transformation, training and evaluation for reproducibility'],
    stack: ['Python', 'Scikit-learn', 'Pandas'], github: 'https://github.com/Prath4m-cmd'
  },
  {
    id: 'algerian-fire-sense', name: 'AlgerianFireSense', tag: 'Fire Weather Index prediction',
    problem: 'Assess wildfire risk by predicting the Fire Weather Index from weather data.',
    features: ['Exploratory analysis of feature correlations and fire-prone weather patterns', 'Missing-value handling, scaling and encoding', 'Compared Linear, Ridge, Lasso and ElasticNet regression with tuned hyperparameters', 'Selected the best model by MAE, RMSE and R²'],
    stack: ['Python', 'Scikit-learn'], github: 'https://github.com/Prath4m-cmd'
  },
]
export const experience = [
  {
    role: 'AI/ML Intern', org: 'Evostra Ventures Pvt Ltd', where: 'Remote, Hyderabad', when: 'Nov 2025 – Dec 2025',
    points: ['Engineered supervised and unsupervised learning pipelines end to end: preprocessing, training and evaluation', 'Applied core ML workflows in a production-style setting with reproducible experiments and systematic evaluation']
  },
]
export const education = [
  { name: 'Sanjay Ghodawat Institute', what: 'B.Tech, Computer Science (pursuing)', when: 'Aug 2023 – Jun 2027' },
  { name: 'Sambhajirao Mane Jr. College, Gadhinglaj', what: 'Class XII, 74%', when: 'Apr 2021 – Mar 2023' },
  { name: 'Carmel Ashish Convent School, Adkur', what: 'Class X, 91%', when: 'Apr 2020 – Mar 2021' },
]
export const achievements = [
  { title: '1st place, Hyperloop poster presentation', where: 'Impulse 2k24, BSIET Kolhapur', note: 'Recognized for research depth, technical communication and presentation quality.' },
  { title: 'Top 5 finalist, Code Crusade', where: 'Nimbus 2k25', note: 'Placed top 5 in a multi-stage competitive programming contest.' },
]

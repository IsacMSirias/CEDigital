// app/index.js
import { useState } from 'react';
import CoursePage from './coursepage';
import DocumentsPage from './documentspage';
import EvaluationsPage from './evaluationspage';
import GradesReportPage from './gradesreportpage';
import Login from './login';
import MainPage from './mainpage';
import NewsPage from './newspage';

export default function Page() {
  const [screen, setScreen] = useState('login');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const goToMainPage = () => setScreen('main');
  const goToCoursePage = (courseName) => {
    setSelectedCourse(courseName);
    setScreen('course');
  };
  const goToDocumentsPage = () => setScreen('documents');
  const goToEvaluationsPage = () => setScreen('evaluations');
  const goToGradesReportPage = () => setScreen('gradesReport');
  const goToNewsPage = () => setScreen('news');
  const goBack = () => setScreen('main');

  if (screen === 'login') return <Login onSuccess={goToMainPage} />;
  if (screen === 'main') return <MainPage onSelectCourse={goToCoursePage} />;
  if (screen === 'course') {
    return (
      <CoursePage
        courseName={selectedCourse}
        onBack={goBack}
        onViewDocuments={goToDocumentsPage}
        onViewEvaluations={goToEvaluationsPage}
        onViewGrades={goToGradesReportPage}
        onViewNews={goToNewsPage}
      />
    );
  }
  if (screen === 'documents') return <DocumentsPage onBack={goBack} />;
  if (screen === 'evaluations') return <EvaluationsPage onBack={goBack} />;
  if (screen === 'gradesReport') return <GradesReportPage onBack={goBack} />;
  if (screen === 'news') return <NewsPage onBack={goBack} />;
}

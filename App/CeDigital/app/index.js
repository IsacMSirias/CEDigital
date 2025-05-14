import { Suspense, lazy, useState } from 'react';

const CoursePage = lazy(() => import('./estudiantes/coursepage'));
const DocumentsPage = lazy(() => import('./estudiantes/documentspage'));
const EvaluationsPage = lazy(() => import('./estudiantes/evaluationspage'));
const GradesReportPage = lazy(() => import('./estudiantes/gradesreportpage'));
const Login = lazy(() => import('./login'));
const NewsPage = lazy(() => import('./estudiantes/newspage'));

// MainPages por rol
const MainEstudiante = lazy(() => import('./estudiantes/mainpage'));
const MainProfesor = lazy(() => import('./profesores/mainpage'));
const MainAdmin = lazy(() => import('./administradores/mainpage'));

export default function Page() {
  const [screen, setScreen] = useState('login');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const goToCoursePage = (courseName) => {
    setSelectedCourse(courseName);
    setScreen('course');
  };

  const goToDocumentsPage = () => setScreen('documents');
  const goToEvaluationsPage = () => setScreen('evaluations');
  const goToGradesReportPage = () => setScreen('gradesReport');
  const goToNewsPage = () => setScreen('news');
  const goBack = () => setScreen('mainEstudiante'); // default back

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      {screen === 'login' && (
        <Login
          onEstudiante={() => setScreen('mainEstudiante')}
          onProfesor={() => setScreen('mainProfesor')}
          onAdmin={() => setScreen('mainAdmin')}
        />
      )}

      {screen === 'mainEstudiante' && (
        <MainEstudiante onSelectCourse={goToCoursePage} />
      )}
      {screen === 'mainProfesor' && <MainProfesor />}
      {screen === 'mainAdmin' && <MainAdmin />}

      {screen === 'course' && (
        <CoursePage
          courseName={selectedCourse}
          onBack={goBack}
          onViewDocuments={goToDocumentsPage}
          onViewEvaluations={goToEvaluationsPage}
          onViewGrades={goToGradesReportPage}
          onViewNews={goToNewsPage}
        />
      )}

      {screen === 'documents' && <DocumentsPage onBack={goBack} />}
      {screen === 'evaluations' && <EvaluationsPage onBack={goBack} />}
      {screen === 'gradesReport' && <GradesReportPage onBack={goBack} />}
      {screen === 'news' && <NewsPage onBack={goBack} />}
    </Suspense>
  );
}

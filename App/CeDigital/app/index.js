import { Suspense, lazy, useState } from 'react';
import { Text, View } from 'react-native';

const CoursePage = lazy(() => import('./estudiantes/coursepage'));
const DocumentsPage = lazy(() => import('./estudiantes/documentos'));
const EvaluationsPage = lazy(() => import('./estudiantes/evaluaciones'));
const GradesReportPage = lazy(() => import('./estudiantes/notas'));
const NewsPage = lazy(() => import('./estudiantes/noticias'));

const Login = lazy(() => import('./login'));
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
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Cargando...</Text>
        </View>
      }
    >
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

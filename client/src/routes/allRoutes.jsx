import adminRoutes from "./AdminRoutes";
import directorRoutes from "./DirectorRoutes";
import principalRoutes from "./PrincipalRoutes";
import teacherRoutes from "./TeacherRoutes";
import studentRoutes from "./StudentRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import DirectorLogin from "../pages/DirectorLogin";
import AdminLogin from "../pages/AdminLogin";
import PrincipalLogin from "../pages/PrincipalLogin";
import TeacherLogin from "../pages/TeacherLogin";
import StudentLogin from "../pages/StudentLogin";
import DashboardLayout from "../components/DashboardLayout";
import LandingPage from "../pages/LandingPage"

export default function MasterRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route path="/director/login" element={<DirectorLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/principal/login" element={<PrincipalLogin />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
      </Route>

      <Route path="/director" element={<ProtectedRoute allowedRole="director" />}>
        <Route element={<DashboardLayout role="director" />}>
          {directorRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route path="/admin" element={<ProtectedRoute allowedRole="admin" />}>
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/principal" element={<ProtectedRoute allowedRole="principal" />}>
        <Route element={<DashboardLayout role="principal" />}>
          {principalRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher" />}>
        {teacherRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/student" element={<ProtectedRoute allowedRole="student" />}>
        {studentRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router";
import { HashRouter as Router } from "react-router";

import { ScrollToTop } from "./components/common/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

import NotFound from "./pages/OtherPage/NotFound";

// auth
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// profile
import UserProfiles from "./pages/UserProfiles";

// admin
import Dashboards from "./pages/Administration/Dashboard/Dashboard";

import Clients from "./pages/Clients/Clients";
import ClientDetails from "./pages/Clients/Details/ClientDetails";

import Coachs from "./pages/Coachs/Coachs";
import Assistants from "./pages/Assistants/Assistants";

// operations
import Payments from "./pages/Payments/Payments";

export default function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<ScrollToTop />
					<Routes>
						{/* Auth Layout */}
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />

						{/* Dashboard Layout - Protected Routes */}
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								path="/"
								element={
									<ProtectedRoute
										requiredRoles={["Admin", "Cliente", "Profesor"]}
									>
										<UserProfiles />
									</ProtectedRoute>
								}
							/>

							{/* profile Page */}
							<Route
								path="/profile"
								element={
									<ProtectedRoute
										requiredRoles={["Admin", "Cliente", "Profesor"]}
									>
										<UserProfiles />
									</ProtectedRoute>
								}
							/>

							{/* Client Page */}
							<Route path="/clients">
								<Route
									path=""
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Clients />
										</ProtectedRoute>
									}
								/>
								<Route
									path=":id"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ClientDetails />
										</ProtectedRoute>
									}
								/>
							</Route>

							{/* Coach Page */}
							<Route path="/coachs">
								<Route
									path=""
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Coachs />
										</ProtectedRoute>
									}
								/>
							</Route>

							{/* Assistant Page */}
							<Route path="/assistants">
								<Route
									path="list"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Assistants />
										</ProtectedRoute>
									}
								/>
							</Route>

							{/* Payments Page */}
							<Route path="/payments">
								<Route
									path="list"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Payments />
										</ProtectedRoute>
									}
								/>
							</Route>

							{/* Admin Clients Page */}
							<Route path="/administration">
								<Route
									path="dashboard"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Dashboards />
										</ProtectedRoute>
									}
								/>
							</Route>
						</Route>

						{/* Root redirect */}
						<Route path="/" element={<Navigate to="/signin" replace />} />

						{/* Fallback Route */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

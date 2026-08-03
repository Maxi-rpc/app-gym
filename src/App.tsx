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

// clients
import Clients from "./pages/Clients/Clients";
import ClientDetails from "./pages/Clients/Details/ClientDetails";

// employee
import Coachs from "./pages/Employeers/Employeers";

// assistance
import Assistants from "./pages/Assistants/List/List";
import AssistantsRegister from "./pages/Assistants/Register/Register";

// payments
import Payments from "./pages/Payments/List/List";
import PaymentsRegister from "./pages/Payments/Register/Register";

// configurations
import ConfigRoles from "./pages/Configurations/Roles/Roles";
import ConfigUserStatus from "./pages/Configurations/UserStatus/UserStatus";
import ConfigMembershipStatus from "./pages/Configurations/MembershipStatus/MembershipStatus";

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
									path="register"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<AssistantsRegister />
										</ProtectedRoute>
									}
								/>
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
									path="register"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<PaymentsRegister />
										</ProtectedRoute>
									}
								/>
								<Route
									path="list"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Payments />
										</ProtectedRoute>
									}
								/>
							</Route>

							{/* Configuration Page */}
							<Route path="/configurations">
								<Route
									path="roles"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigRoles />
										</ProtectedRoute>
									}
								/>
								<Route
									path="user-status"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigUserStatus />
										</ProtectedRoute>
									}
								/>{" "}
								<Route
									path="membership-status"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigMembershipStatus />
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

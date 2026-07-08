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
import Clients from "./pages/Administration/Clients/Clients";
import Coachs from "./pages/Administration/Coachs/Coachs";
import Products from "./pages/Administration/Products/Products";
import Assistants from "./pages/Administration/Assistants/Assistants";

// operations
import Payments from "./pages/Operations/Payments/Payments";

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
									<ProtectedRoute requiredRoles={["admin", "client", "coach"]}>
										<UserProfiles />
									</ProtectedRoute>
								}
							/>

							{/* profile Page */}
							<Route
								path="/profile"
								element={
									<ProtectedRoute requiredRoles={["admin", "client", "coach"]}>
										<UserProfiles />
									</ProtectedRoute>
								}
							/>

							{/* Admin Clients Page */}
							<Route path="/administration">
								<Route
									path="dashboard"
									element={
										<ProtectedRoute requiredRoles={["admin", "coach"]}>
											<Dashboards />
										</ProtectedRoute>
									}
								/>
								<Route
									path="clients"
									element={
										<ProtectedRoute requiredRoles={["admin", "coach"]}>
											<Clients />
										</ProtectedRoute>
									}
								/>
								<Route
									path="coachs"
									element={
										<ProtectedRoute requiredRoles={["admin", "coach"]}>
											<Coachs />
										</ProtectedRoute>
									}
								/>
								<Route
									path="products"
									element={
										<ProtectedRoute requiredRoles={["admin", "coach"]}>
											<Products />
										</ProtectedRoute>
									}
								/>
								<Route
									path="assistants"
									element={
										<ProtectedRoute requiredRoles={["admin", "coach"]}>
											<Assistants />
										</ProtectedRoute>
									}
								/>
							</Route>
							{/* Paid Page */}
							<Route path="/operations">
								<Route
									path="payments"
									element={
										<ProtectedRoute requiredRoles={["admin", "coach"]}>
											<Payments />
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

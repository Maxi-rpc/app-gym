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
import AssistantsRegisterQR from "./pages/Assistants/RegisterQR/RegisterQR";
import AssistantsRegister from "./pages/Assistants/Register/Register";

// payments
import Payments from "./pages/Payments/List/List";
import PaymentsRegister from "./pages/Payments/Register/Register";

// products
import Products from "./pages/Products/List/List";
import ProductsStock from "./pages/Products/Stock/List";
import ProductsHistoryStock from "./pages/Products/StockHistory/List";
import ProductRegisterSale from "./pages/Products/Register/Register";

// configurations
import ConfigRoles from "./pages/Configurations/Roles/Roles";
import ConfigUserStatus from "./pages/Configurations/UserStatus/UserStatus";
import ConfigMembershipStatus from "./pages/Configurations/MembershipStatus/MembershipStatus";
import ConfigPaymentStatus from "./pages/Configurations/PaymentStatus/PaymentStatus";
import ConfigPaymentMethods from "./pages/Configurations/PaymentMethods/PaymentMethods";
import ConfigServices from "./pages/Configurations/Services/Services";
import ConfigProductCategories from "./pages/Configurations/ProductCategories/ProductCategories";
import ConfigProductStatus from "./pages/Configurations/ProductStatus/ProductStatus";

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
									path="register-qr"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<AssistantsRegisterQR />
										</ProtectedRoute>
									}
								/>
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

							{/* Products Page */}
							<Route path="/products">
								<Route
									path="register-sale"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ProductRegisterSale />
										</ProtectedRoute>
									}
								/>
								<Route
									path="list"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<Products />
										</ProtectedRoute>
									}
								/>
								<Route
									path="stock"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ProductsStock />
										</ProtectedRoute>
									}
								/>
								<Route
									path="stock-history"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ProductsHistoryStock />
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
								/>
								<Route
									path="membership-status"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigMembershipStatus />
										</ProtectedRoute>
									}
								/>
								<Route
									path="payment-status"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigPaymentStatus />
										</ProtectedRoute>
									}
								/>
								<Route
									path="payment-methods"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigPaymentMethods />
										</ProtectedRoute>
									}
								/>
								<Route
									path="services"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigServices />
										</ProtectedRoute>
									}
								/>
								<Route
									path="product-categories"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigProductCategories />
										</ProtectedRoute>
									}
								/>
								<Route
									path="product-status"
									element={
										<ProtectedRoute requiredRoles={["Admin", "Profesor"]}>
											<ConfigProductStatus />
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

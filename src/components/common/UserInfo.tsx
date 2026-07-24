import { useAuth } from "../../hooks/useAuth";

export function UserInfo() {
	const { profile, isAuthenticated, logout } = useAuth();

	console.log(profile);

	if (!isAuthenticated || !profile) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2">
			<div>
				<p className="text-sm font-semibold text-gray-900 dark:text-white">
					{profile?.name} {profile?.last_name}
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-400">
					{profile?.email}
				</p>
			</div>
			<div className="flex gap-2">
				<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
					{profile?.user_roles?.join(", ")}
				</span>
			</div>
			<button
				onClick={logout}
				className="text-sm text-red-500 hover:text-red-600 font-medium"
			>
				Logout
			</button>
		</div>
	);
}

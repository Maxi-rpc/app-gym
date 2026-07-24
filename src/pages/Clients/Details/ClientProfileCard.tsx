import { useState, useEffect } from "react";

// import { publicAsset } from "../../utils/publicAsset";
import Badge from "../../../components/ui/badge/Badge";

import { Profile } from "../../../context/types/Profile";

import QRCode from "react-qr-code";

interface Props {
	data: Profile | null;
}

export default function UserDataCard({ data }: Props) {
	const [profile, setProfile] = useState<Profile | null>(null);

	const roleNames =
		profile?.user_roles
			?.map((ur) => ur.role?.name)
			.filter(Boolean)
			.join(", ") ?? "";

	useEffect(() => {
		setProfile(data);
	}, [data]);

	return (
		<>
			<div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
				<div className="flex flex-col gap-5 sm:flex-row xl:gap-10">
					<div className="flex-1">
						<div className="mb-6 flex flex-col gap-5 sm:flex-row xl:items-center xl:justify-between">
							<div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
								<div className="border-gray-20 overflow-hidden rounded border dark:border-gray-800">
									<QRCode value={profile?.qr_token || "no data"} size={100} />
								</div>
								{/* <div className="border-gray-20 overflow-hidden rounded-full border dark:border-gray-800">
									<img
										className="size-20"
										alt="user"
										src={publicAsset("images/user/owner.jpg")}
									/>
								</div> */}
								<div className="mr-3 overflow-hidden rounded-full h-20 w-20 bg-brand-400 inline-flex items-center justify-center text-5xl font-medium text-white">
									{profile?.name[0]}
								</div>

								<div className="text-left">
									<h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
										{profile?.name} {profile?.last_name}{" "}
										<Badge color="success">{profile?.status?.name}</Badge>
									</h4>
									<div className="flex items-center gap-1 sm:gap-3">
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{roleNames}
										</p>
										<div className="hidden h-3.5 w-px bg-gray-300 sm:block dark:bg-gray-700"></div>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Buenos Aires, Argentina.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="relative grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-11 xl:gap-y-7">
							<div className="w-full">
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Nombre
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.name}
								</p>
							</div>
							<div className="w-full">
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Apellido
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.last_name}
								</p>
							</div>
							<div className="w-full">
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Email
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.email}
								</p>
							</div>
							<div className="hidden xl:block"></div>
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Cumpleaños
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.birth_date}
								</p>
							</div>
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Teléfono
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{profile?.phone}
								</p>
							</div>
							<div>
								<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
									Role
								</p>
								<p className="text-sm font-medium text-gray-800 dark:text-white/90">
									{roleNames}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

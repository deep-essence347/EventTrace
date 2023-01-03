import { Tabs } from "./Tabs";
import DefaultCover from "../../../app-images/DefaultCover.png";
import { useGetEvent } from "./eventFunctions";
import { BsFillCameraFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../services/upload_file";
import { updateEvent } from "../../../services/crud/events";
import { updateEvent as updateState } from "../../../redux/actions/eventActions";
import { message, Spin } from "antd";
import { SplashScreen } from "../../../splash";

export const EventDescription = () => {
	const event = useGetEvent();
	const dispatch = useDispatch();
	const { loggedIn, currentUser } = useSelector((state) => state.users);
	const [uploadingCover, setUploadingCover] = useState(false);
	const fileInput = useRef(null);

	const uploadCover = async (file) => {
		try {
			setUploadingCover(true);
			const coverImageUrl = await uploadFile({
				file: file,
				folderRef: "events",
			});
			await updateEvent({ coverImage: coverImageUrl }, event.id);
			event.coverImage = coverImageUrl;
			dispatch(updateState(event));
			message.success("Cover image for your event has been uploaded.");
		} catch (error) {
			console.log(error);
			message.error("There was an error uploading your image.");
		}
		setUploadingCover(false);
	};

	if (!event) return <SplashScreen />;
	return (
		<div className="w-full">
			<section className="relative w-full lg:h-[32rem] md:h-[24rem] h-[18rem] bg-grey">
				<div className="w-full h-full bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600">
					<img
						src={event.coverImage ? event.coverImage : DefaultCover}
						alt={event.name + "'s Cover"}
						className="sm:w-4/5 w-full object-cover mx-auto h-full"
					/>
				</div>
				{loggedIn && currentUser.id === event.creator.id && (
					<button
						className="absolute group flex bottom-5 right-0 text-primary bg-secondary px-3 py-2 rounded-l-full"
						onClick={() => fileInput.current.click()}
					>
						{uploadingCover && <Spin className="w-5 h-5" />}
						{!uploadingCover && <BsFillCameraFill className="w-5 h-5" />}
						<span
							className={`group-hover:block ${
								uploadingCover ? "block" : "hidden"
							} pl-1.5 text-base font-medium`}
						>
							{uploadingCover ? "Uploading" : "Upload Cover"}
						</span>
						<input
							type="file"
							className="hidden"
							disabled={uploadingCover}
							ref={fileInput}
							onChange={async (file) => await uploadCover(file.target.files[0])}
						/>
					</button>
				)}
			</section>
			<section>
				<Tabs />
			</section>
		</div>
	);
};

import { useEffect, useState } from "react";
import MDSpinner from "react-md-spinner";
import dotenv from "dotenv";

dotenv.config();

const agentUID = "agent000";
const appID = "195212e8c45a9d14";
const region = "us";
const AUTH_KEY = "fb5fcdc077d3f29b78d3a38e343eea17cc53a4c2";
const wid = "ee8c03e4-d063-4d25-afcd-9efd0ad7e568";

const Agent = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		window.CometChatWidget.init({
			appID: appID,
			appRegion: region,
			authKey: AUTH_KEY
		}).then(
			(response) => {
				console.log("Initialization completed successfully");
				//You can now call login function.
				window.CometChatWidget.login({
					uid: agentUID
				}).then(
					(response) => {
						window.CometChatWidget.launch({
							widgetID: wid,
							target: "#cometchat",
							roundedCorners: "true",
							height: "600px",
							width: "100%",
							defaultID: "", //default UID (user) or GUID (group) to show,
							defaultType: "user" //user or group
						});
						setLoading(false);
					},
					(error) => {
						console.log("User login failed with error:", error);
						//Check the reason for error and take appropriate action.
					}
				);
			},
			(error) => {
				console.log("Initialization failed with error:", error);
				//Check the reason for error and take appropriate action.
			}
		);
	}, []);
	if (loading) {
		return (
			<div>
				<MDSpinner />
			</div>
		);
	}
	return <div id="cometchat" style={{ margin: "0 auto", width: "60%" }} />;
};
export default Agent;

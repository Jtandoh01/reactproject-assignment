// Importing the necessary components
import SideBar from "./Layouts/SideBar";
import FollowBar from "./Layouts/FollowBar";

// Defining the interface for the props
interface LayoutProps{
	children: React.ReactNode;
}

// Defining the layout component as a react functional component
const Layout: React.FC<LayoutProps> = ({children}) => {
	return (
		//The main container for the layout
		<div className="h-screen bg-black">
			<div className="container h-full mx-auto xl:px-30 max-w-6xl">
				<div className="grid grid-cols-4 h-full">
					<!-- The sidebar component: This is where the Profiles, Tweet button, Notifications, Home button reside -->
					<SideBar />
					<div className="
						 col-span-3 
						 lg:col-span-2 
						 border-x-[1px]
						 border-neutral-800
					">
							<!-- The content of the layout: This is where posts will be displayed will be dispalyed -->
			   			{children}
				  	</div>
						<!-- The follow bar component: This is where accounts are recommended for users to follow or view their pages  -->
				  	<FollowBar />
				</div>
			</div>
		</div>
	)
}
export default Layout

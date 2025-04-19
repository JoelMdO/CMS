import {useRouter} from "next/navigation";

interface RouteButtonProps {
  type?: string;
  'data-cy'?: string;
}

const RouteButton: React.FC<RouteButtonProps> = ({type, 'data-cy': dataCity}) => {
    const router = useRouter();
    const url = process.env.NEXT_PUBLIC_url_api;
    // Define the button type
    let path: string = "";
    let label: string = "";
    let features: string = "bg-gray-500 text-white";
    // Define the button type
    switch (type) {
        case "playbook":
        path = "/playbook";
        label = "Create New";
        break;
        case "read-playbook":
        path = "/readPlaybook";
        label = "Read Playbook";
        break;
        case "with-item-playbook":
        path = "/playbook";
        label = "Continue Editing";
        features = "flex bg-yellow-button text-black w-[160px] self-center" 
        break; 
        default:
        path = "/dashboard";
        label = "New Article";
    }
    // 
    const handleClick = ()=>{
      console.log('button clicked editing');
      
      if(type === "with-item-playbook"){
        router.push(`${url}${path}?modal=true`)
      }else{
        console.log('route others');
        const sessionId = sessionStorage.getItem('sessionId');
        router.push(`${url}${path}?id=${sessionId}`);
    }}
    //
    return (
    <button className={`${features} py-3 px-4 rounded mt-2`} data-cy={dataCity} type= "button" onClick={()=> 
      handleClick()}>{label}</button>
  );
}
export default RouteButton;
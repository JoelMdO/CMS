import React, {useState} from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import successAlert from "../alerts/sucess";
import errorAlert from "../alerts/error";
import { useRouter } from "next/navigation";
import saveButtonClicked from "@/utils/buttons/save_button_clicked";
import emailMe from "@/utils/buttons/email_me";
import handleNoteClick from "@/utils/playbook/handle_note_click";

interface ButtonProps {
    type: string;
    onClick?: () => void;
    isCreating?: boolean;
    id?: string;
    setViewDetails?: React.Dispatch<React.SetStateAction<boolean>>;
    setEntries?: React.Dispatch<React.SetStateAction<any[]>>;
    setUpdateNote?: React.Dispatch<React.SetStateAction<boolean>>;
    onEdit?: (id: string) => void; 
}
//
const CustomButton: React.FC<ButtonProps> = ({type, onClick, isCreating, id, setViewDetails, setEntries, setUpdateNote, onEdit}) => {
    ///========================================================
    // Custom Buttons used on dashboard page at this stage is only
    // for Post (Save the article)
    ///========================================================
    //
    // Variables.
    let text: string, color: string, hover_color: string, icon: string, width: string = "w-[9em]", textColor: string = "text-white", otherFeatures: string = "";
    let textSmallSize: string = "text-[0.60rem]", shadow: string = "shadow-md shadow-black";
    let position: string;
    const url = process.env.NEXT_PUBLIC_url_api;
    const router = useRouter();
    // States
    const [isClicked, setIsClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [noteViewMode, setNoteViewMode] = useState<"view" | "edit">("view");
    // const [isNew, setNew] = useState(false);
    let isNew: boolean = false;
    // Retrieve text styles from Redux for saving on saveButtonClicked
    const italic = useSelector((state: any) => state.data_state?.fontStyle);
    const bold = useSelector((state: any) => state.data_state?.fontWeight);
    //
    //
    switch (type) {
        case "post":
            text = "Post";
            color = "bg-green";
            hover_color= "bg-green-light";
            icon='/inbox.png';
            position='';
        break;
        case "new":
            isNew = true;
            text = isCreating ? "Cancel" : "Create New Entry";
            color = "bg-blue-light";
            hover_color= "bg-green";
            icon='';
            position='';
        break;
        case "view-note":
            isNew = true;
            if(noteViewMode === "view"){ text = "View Details"} else { text="Update"};
            color = "bg-gray-100";
            hover_color = "bg-gray-200";
            width = "w-full";
            textColor = "text-black";
            otherFeatures = "py-2 rounded transition";
            icon='';
            position='';
            textSmallSize = "text-[0.80rem]";
            shadow= "shadow-sm shadow-gray-800";
        break;
        default:
            text = "Clear";
            hover_color= "bg-green";
            color = "bg-blue";
            icon='/clear.png';
            position='';
        break;
        
    }
    //
    // Function to handle button click and add a new textarea/
    //
    return ( 
        <>
            <button
                type = "button"                
                className={`h-[40px] ${width} ${textColor} ${otherFeatures} ${shadow} ${position} ${isClicked? "text-black":{textColor}} ${textSmallSize} md:text-lg font-bold rounded text-center flex items-center justify-center md:gap-2 gap-1 mt-4 ${isClicked? "bg-cream" : `${color}`} hover:${hover_color}`}
                onClick={() => {
                    if (onClick) onClick(); 
                        setTimeout(() => {
                        if(type === "post"){
                            ///For Posting the article
                            setLoading(true);
                            setIsClicked(true);
                            saveButtonClicked(italic, bold)
                            .then((response) => {     
                                if (response.status === 200) {
                                setLoading(false);
                                setIsClicked(false);
                                successAlert("saved");
                                //From posting the new body article to be updated on the session storage. 
                                if(response.body){
                                    let articleContent = JSON.parse(sessionStorage.getItem("articleContent") || "[]");
                                    articleContent.push({ type: "body", content: response.body});
                                }
                                } else if (response.message === "User not authenticated" || response.status === 401) {
                                    setLoading(false);
                                    setIsClicked(false);
                                    errorAlert("saved", "nonauth", response.message);
                                    //Redirect the user to login page
                                        router.push(`${url}/`);
                                } else {
                                    setLoading(false);
                                    setIsClicked(false);    
                                 errorAlert("saved", "non200", response.message);
                                }
                            }).catch((error) => {
                                errorAlert("saved", "error", error);
                            })
                        } else if (type === "logo"){
                            ///To connect with me on Logo click
                            emailMe();
                        } else if (type === "view-note"){
                            setNoteViewMode((prev) => (prev === "view" ? "edit" : "view"));
                            if (noteViewMode === "view") {
                                setViewDetails!(true);
                                handleNoteClick(id!).then((meta) => {
                                if (meta) {
                                  setEntries!((prev) =>
                                    prev.map((entry) => (entry.id === id ? meta : entry))
                                  );
                                }
                              });
                            }else {
                                //Send the update to allow update the playbook note.
                                setUpdateNote!(true);
                                if (onEdit && id) onEdit(id); // notify parent with ID
                            }
                        } else {
                            ///No action as clear function is on dashboard/page.tsx
                        }
                        }, 1000);}}   >
                        {isNew? null :
                        <Image src={icon} style={{display:isClicked? "none" :"block"}} className="md:w-6 md:h-6 w-3 h-3 cursor-pointer" width={12} height={12} alt={`${text}-icon`}/>}{isClicked? "Posting" : `${text}`}
            </button>
        </>
    );
}

export default CustomButton;
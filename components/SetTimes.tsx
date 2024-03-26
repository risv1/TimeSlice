import { Settings } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog";

const SetTimes = () => {
    return(
        <div className="overflow-hidden">
        <Dialog>
          <DialogTrigger className="hover:rotate-180 duration-150 ease-in-out"><Settings color="#ffffff" width={70} height={70} /></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-black font-semibold text-3xl border-b pb-3 border-gray-500">Settings</DialogTitle>
              <DialogDescription>
                <div className="w-full h-full">
                    <h1 className="text-black font-normal text-xl tracking-widest pt-2">TIME ( MINUTES )</h1>
                    <div className="flex flex-row pt-2">
                        <label htmlFor="" className="text-lg">Timer</label>
                        <select  name="" id="">
                            
                        </select>
                    </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    )
}

export default SetTimes;
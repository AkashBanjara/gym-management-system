import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMembership = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/plans/get-membership`,
        { withCredentials: true },
      );
     
      setMembership(response.data.membership);
      setPlanMember(response.data.membership[0]._id);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/members/get-member/${id}`,
        { withCredentials: true },
      );
     
      setData(response.data.member);
      setStatus(response.data.member.status);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  async function handleSwitchButton() {
    let statuss = status === "Active" ? "Pending" : "Active";
    await axios.post(`${apiUrl}/members/change-status/${id}`, {status:statuss},{withCredentials:true}).then((response)=>{
      setStatus(statuss);
      toast.success("Status Changed")

    }).catch(err=>{
      console.log(err)
      toast.error("Something went wrong")
    })
  }

  const isDateInPast = (inputDate) => {
    const today = new Date(); //get the current date
    const givenDate = new Date(inputDate); //convert the input to a Date Object

    return givenDate < today; //check if the given date is before today
  };

  const handleOnChangeSelect = (e) => {
    let value = e.target.value;
    setPlanMember(value);
  };

  const  handleRenewSaveBtn=async()=>{
    await axios.put(`${apiUrl}/members/update-member-plan/${id}`,{membership:planMember},{withCredentials:true}).then((response)=>{
      setData(response.data.member)
      toast.success(response.data.message)
    }).catch(err=>{
      toast.error("Something went wrong")
      console.log(err)
    })

  }

  return (
    <div className="w-3/4 text-black p-5">
      <div
        onClick={() => navigate(-1)}
        className="border-2 w-fit cursor-pointer px-1 text-xl font-sans text-white rounded-xl bg-slate-900 "
      >
        <ArrowBackIcon />
        Go Back
      </div>
      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img
              className="h-full m-auto"
              src={data?.profilePic}
              alt="user image"
            />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5 ">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name:{data?.name}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile:+91 {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address:{data?.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date:
              {data?.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date:
              {data?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
            </div>

            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold ">
              Status :{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={() => handleSwitchButton()}
              />
            </div>

            {isDateInPast(data?.nextBillDate) && (
              <div
                onClick={() => setRenew((prev) => !prev)}
                className={`mt-1 rounded-lg border-2 p-3 border-slate-900 text-center w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-slate-900 to-slate-700 ${
                  renew && status === "Active"
                    ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white "
                    : null
                }  `}
              >
                Renew
              </div>
            )}

            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 md:w-[100%] ">
                <div className="w-2/3">
                  <div className="my-5">
                    <div>Membirship</div>
                    <select
                      value={planMember}
                      onChange={handleOnChangeSelect}
                      className="w-full border-2 p-2 rounded-lg"
                    >
                      {membership.map((item, index) => {
                        return (
                          <option value={item._id} key={index}>
                            {item.months} Months Membership
                          </option>
                        );
                      })}
                    </select>
                    <div 
                    onClick={()=> handleRenewSaveBtn()}
                      className={`mt-3 rounded-lg p-1 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-slate-900 to-slate-700  `}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MemberDetail;

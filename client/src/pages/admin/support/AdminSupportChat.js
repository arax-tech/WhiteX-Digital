import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import MetaData from '../../../components/MetaData';
import { CreateSupportChatAction, GetSingleSupportTicketAction } from '../../../redux/actions/Admin/SupportTicketAction';
import { Send } from 'react-feather';
import { SUPPORT_CHAT_RESET } from '../../../redux/constants/Admin/SupportTicketConstant';
const AdminSupportChat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, chats, isChat, message } = useSelector((state) => state.supportTickets);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadSupportTicket) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(GetSingleSupportTicketAction(id));
        }, 10000);
        return () => clearInterval(interval);
    }, [dispatch, id]);

    const [content, setContent] = useState(null);
    const CreateChatFunction = async (event) => {
        event.preventDefault();
        await dispatch(CreateSupportChatAction(id, content))
    }

    useEffect(() => {
        if (isChat && isChat === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: SUPPORT_CHAT_RESET })
            setContent('');
            dispatch(GetSingleSupportTicketAction(id));
        }
    }, [dispatch, isChat, message, id]);

    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Support Tickets Chat" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Support Tickets Chat</h4>
                            </div>



                            <div className='chat-application p-2'>
                                <div class="chats">
                                    {
                                        chats?.map((chat, index) => (
                                            <div key={index} class={`chat mb-1 d-flex ${chat?.user_id === user?.id ? 'align-items-end  justify-content-end' : 'align-items-start  justify-content-start'} `}>
                                                {
                                                    chat?.user_id === user?.id ? (
                                                        <>
                                                            <div class="chat-body pt-1 pl-1">
                                                                <div class={`chat-content ${chat?.user_id === user?.id ? 'chat-right' : 'chat-left'}`}>
                                                                    <p>{chat?.content}</p>
                                                                </div>
                                                            </div>
                                                            <div class="chat-avatar">
                                                                <span class="avatar box-shadow-1 cursor-pointer">
                                                                    <img src={chat?.user_image?.length > 0 ? chat?.user_image : "/placeholder.jpg"} alt="avatar" height="36" width="36" />
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div class="chat-avatar">
                                                                <span class="avatar box-shadow-1 cursor-pointer">
                                                                    <img src={chat?.user_image?.length > 0 ? chat?.user_image : "/placeholder.jpg"} alt="avatar" height="36" width="36" />
                                                                </span>
                                                            </div>
                                                            <div class="chat-body pt-1 pl-1">
                                                                <div class={`chat-content ${chat?.user_id === user?.id ? 'chat-right' : 'chat-left'}`}>
                                                                    <p>{chat?.content}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }


                                            </div>
                                        ))
                                    }


                                </div>
                                <br />
                                <form onSubmit={CreateChatFunction} class="chat-app-form">
                                    <div class="input-group input-group-merge mr-1 form-send-message">

                                        <input type="text" onChange={(event) => setContent(event.target.value)} required class="form-control message" style={{ width: '90%' }} value={content} placeholder="Type your message or use speech to text" />

                                        <button type="submit" class="btn btn-primary send">
                                            <Send class="d-lg-none" />
                                            <span class="d-none d-lg-block">Send</span>
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AdminSupportChat

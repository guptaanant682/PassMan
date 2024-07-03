import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
// uuidv4();
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        try {
            let req = await fetch('http://localhost:3000/');
            if (!req.ok) {
                throw new Error('Network response was not ok' + req.statusText);
            }
            let passwords = await req.json();
            console.log(passwords);
            setpasswordArray(passwords);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/close.png.png")) {
            ref.current.src = "icons/eye.png.png"
            passwordRef.current.type = "text"
            // password.current.type = "password"
        }
        else {
            ref.current.src = "icons/close.png.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        try {
            const newPassword = { ...form, id: uuidv4() };
            setpasswordArray([...passwordArray, newPassword]);
    
            let res = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword)
            });
    
            if (!res.ok) {
                throw new Error('Network response was not ok' + res.statusText);
            }

            setform({ site: "", username: "", password: "" });
        }catch (error) {
            console.error('There was a problem with the save operation:', error);
            // toast('Failed to save password', {
            //     position: "topRight",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
        }
        toast('Password Saved!', {
            position: "topRight",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }


    const deletePassword = async (id) => {
        console.log("Deleting password with id: ", id);
        let confirmDelete = confirm("Do you really want to delete this entry?");
        
        if (confirmDelete) {
            try {
                let res = await fetch("http://localhost:3000/passwords", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
    
                if (!res.ok) {
                    throw new Error('Network response was not ok: ' + res.statusText);
                }
    
                setpasswordArray(passwordArray.filter(item => item.id !== id));
    
                // Uncomment if needed
                // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
    
                toast('Password Deleted!', {
                    position: "topLeft",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                console.error('There was a problem with the delete operation:', error);
                toast('Failed to delete password', {
                    position: "topLeft",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className=" mx-auto px-2 md:  md:myContainer w-3/4">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>Manager/&gt;</span>
                </h1>
                <p className='text-green-700 text-center text-lg'>Your Own Password Manager</p>
                <div className="flex gap-8 flex-col items-center justify-center p-4 text-black ">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border p-1 border-green-500 w-full ' type="text" name="site" id='' />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border p-1 border-green-500 w-3/4 ' type="text" name="username" id='' />
                        <div className="relative ">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border p-1 border-green-500 w-full ' type="password" name="password" id='' />
                            <span className='absolute right-[6px] top-[2px] cursor-pointer' onClick={showPassword}>
                                <img className='p-1' width={30} ref={ref} src="icons/eye.png.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="flex justify-center gap-2 w-fit hover:bg-green-600 items-center bg-green-400 rounded-full px-6 py-2 border-2 border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'> Your Password </h2>
                    {passwordArray.length === 0 && <div>No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className=' py-2'>Site</th>
                                <th className=' py-2'>Username</th>
                                <th className=' py-2'>Passwords</th>
                                <th className=' py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "3px" }}
                                                    className={"cursor-pointer w-20"}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className=' py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span> {item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddinTop": "2px", "paddingLeft": "3px" }}
                                                    className={"cursor-pointer w-20"}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span> {item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "3px" }}
                                                    className={"cursor-pointer w-20"}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-2 border border-white text-center'>
                                        <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
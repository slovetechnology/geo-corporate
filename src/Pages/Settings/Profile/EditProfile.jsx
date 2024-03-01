
import React, { useEffect, useRef, useState } from 'react'
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import checks from "/src/assets/images/good.svg";
import { useDispatch } from 'react-redux';
import { setUserData } from '/src/app/dataSlice';
import { AlertError, FirebaseImage, GoodAlert } from '/src/components/functions';
import { AuthGetApi, AuthPutApi, MainApi } from '/src/services/Geoapi';
import Loading from '/src/components/Loading';
import { AuthPostApi } from '/src/services/Geoapi';
import { SlCamera, SlUser } from 'react-icons/sl';

const EditProfile = (props) => {
    const { user, closeView } = props
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [screen, setScreen] = useState(1)
    const togref = useRef()
    const [forms, setForms] = useState({
        secondary_email: '',
        secondary_phone: '',
        address: '',
    })

    useEffect(() => {
        togref && window.addEventListener('click', (e) => {
            togref.current !== null && !togref.current.contains(e.target) && props.closeView()
        }, true)
    }, [props])


    const handleForms = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }
    const imgref = useRef()
    const [logo, setLogo] = useState({
        img: null,
        image: null
    })
    const handleUpdate = e => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) {
            imgref.current.value = null
            return AlertError(`Upload a valid image format`)
        }
        if (file.size > 1000000) {
            imgref.current.value = null
            return AlertError(`Image size must be less than 1MB`)
        }
        setLogo({
            img: URL.createObjectURL(file),
            image: file
        })
    }
    const handleSubmission = async e => {
        e.preventDefault()
        if (!forms.secondary_email) return AlertError('Secondary Email is required')
        if (!forms.secondary_phone) return AlertError('Secondary Phone Contact is required')
        if (!forms.address) return AlertError('Official Address is required')
        const formdata = new FormData()
        formdata.append('secondary_email', forms.secondary_email)
        formdata.append('secondary_phone', forms.secondary_phone)
        formdata.append('address', forms.address)
        formdata.append('logo', logo.image)
        formdata.append('organization', user.id)
        setLoading(true)
        try {
            const response = await AuthPostApi(MainApi.auth.edit_organization, formdata)
            closeView()
            return GoodAlert(`Information Updated Successfully`)
        } catch (error) {
            AlertError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {loading && <Loading />}
            {screen === 2 && <Overall>
                <div className='bg-[#171B4A] pt-14 pb-8 pl-10'>
                    <div className='flex items-center gap-2'>
                        <img src={checks} alt={checks} className='' />
                        <div className='text-sm text-white'>Upated Successfully</div>
                    </div>
                </div>
            </Overall>}
            {screen === 1 && <Overall2>
                <div ref={togref} className="bg-white w-full max-w-xl max-h-[80vh] overflow-y-auto scrolls">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="text-lg font-semibold capitalize">update Profile</div>
                        <div onClick={props.closeView} className="p-3 text-right rounded-lg cursor-pointer bg-slate-100"> <FaTimes /> </div>
                    </div>
                    <form onSubmit={handleSubmission}>
                        <div className="p-5">
                            <div className="relative mx-auto mb-5 cursor-pointer w-fit">
                                <div className="absolute bottom-0 right-0 p-2 text-xl bg-white rounded-full text-slate-500"> <SlCamera /> </div>
                                <label>
                                    {logo.img ? <img src={logo.img} alt="" className="object-cover rounded-full w-28 h-28" /> :
                                        <div className="p-6 text-6xl border rounded-full text-slate-300"> <SlUser /> </div>}
                                    <input type="file" hidden ref={imgref} onChange={handleUpdate} />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 gap-3 mb-4 lg:grid-cols-2">
                                <div className="mb-3">
                                    <div className="">Secondary Email Address</div>
                                    <Input type="email" name="secondary_email" value={forms.secondary_email} onChange={handleForms} />
                                </div>
                                <div className="mb-3">
                                    <div className="">Secondary Phone Number</div>
                                    <Input type="number" name="secondary_phone" value={forms.secondary_phone} onChange={handleForms} />
                                </div>
                            </div>
                            <div className="">Official Address</div>
                            <InputTextarea name="address" value={forms.address} onChange={handleForms}></InputTextarea>
                        </div>
                        <div className="border-t flex.items-center justify-start p-4">
                            <button className="text-white bg-[#2E61E6] rounded-lg py-3 px-7 capitalize">save changes</button>
                            <button onClick={props.closeView} type="button" className="text-[#2E61E6] ml-5 border border-[#2E61E6] rounded-lg py-3 px-7 capitalize">cancel</button>
                        </div>
                    </form>
                </div>
            </Overall2>}
        </div>
    )
}

export default EditProfile

const Overall = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
`;

const Overall2 = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  top: 0;
  left: 0;
`;
const Input = styled.input`
  width: 100%;
  height: 54px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 15px;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
`;
const InputTextarea = styled.textarea`
  width: 100%;
  height: 54px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 15px;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
`;
import react, { useState } from 'react';




function Profile ({user}) {







    return (
        <div className='flex w-[100%]  min-h-screen justify-center items-center bg-gray-200'>
            profile page of {user.userName}
        </div>
    )
}


export default Profile;
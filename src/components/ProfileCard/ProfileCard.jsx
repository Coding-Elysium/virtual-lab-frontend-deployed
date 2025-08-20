import React from 'react';
import bannerCooking from "../../assets/bannerCooking.jpg"; // banner
import { useMediaQuery } from 'react-responsive';
import MoreOptionsButton from '../MoreOptions/MoreOptions';

const ProfileCard = ({ admin }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-full mx-auto">
      <div className="relative">
        <img
          src={bannerCooking}
          alt="Profile banner"
          className="w-full h-48 object-cover"
        />
        <MoreOptionsButton/>

        <div className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2' : 'left-6'} -bottom-12 flex items-center gap-4`}>
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-white text-3xl font-bold uppercase shadow-lg">
            {admin.firstName?.[0] ?? ''}
            {admin.lastName?.[0] ?? ''}
          </div>
          {!isMobile && (
            <div className='flex flex-col gap-2'>
              <h2 className="text-2xl font-semibold text-white">
                {admin.firstName} {admin.lastName}
              </h2>
              <p className="text-sm text-gray-500">Head Teacher</p>
            </div>
          )}
        </div>
      </div>

      <div className={`pt-20 px-6 pb-6 ${isMobile ? 'text-center' : ''}`}>
        {isMobile && (
          <div className="flex flex-col gap-1 items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {admin.firstName} {admin.lastName}
            </h2>
            <p className="text-sm text-gray-500">Head Teacher</p>
            <p className="text-sm text-gray-700 mt-2">{admin.username ?? 'info@example.com'}</p>
            <p className="text-xs text-gray-500">Username</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

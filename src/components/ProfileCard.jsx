import React from "react";

export default function ProfileCard({ profile }) {
  if (!profile) return <p>No profile loaded</p>;

  return (
    <div className="bg-white shadow rounded p-4">
      <img src={profile.dreamAvatar} alt="Avatar" className="w-24 h-24 rounded-full mb-2" />
      <h2 className="font-bold text-xl">{profile.userId}</h2>
      <div className="mt-2">
        <h3 className="font-semibold">Hobbies:</h3>
        <p>{profile.dreamHobbies?.join(", ")}</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Skills:</h3>
        <p>{profile.dreamSkills?.join(", ")}</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Travel:</h3>
        <p>{profile.dreamTravelLocations?.join(", ")}</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Relationships:</h3>
        <p>{profile.dreamRelationships?.join(", ")}</p>
      </div>
    </div>
  );
}

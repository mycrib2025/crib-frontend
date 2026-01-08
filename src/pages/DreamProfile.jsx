import React, { useEffect, useState } from "react";
import { Dream } from "../lib/api";

export default function DreamProfile({ currentUserId }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    dreamAvatar: "", dreamCareer: "", dreamLifestyle: "", dreamBio: "",
    dreamHobbies: [], dreamSkills: [], dreamTravelLocations: [], dreamRelationships: []
  });

  async function load() {
    try {
      const res = await Dream.get(currentUserId);
      setProfile(res.profile);
      if (res.profile) {
        setForm({
          dreamAvatar: res.profile.dreamAvatar || "",
          dreamCareer: res.profile.dreamCareer || "",
          dreamLifestyle: res.profile.dreamLifestyle || "",
          dreamBio: res.profile.dreamBio || "",
          dreamHobbies: res.profile.dreamHobbies || [],
          dreamSkills: res.profile.dreamSkills || [],
          dreamTravelLocations: res.profile.dreamTravelLocations || [],
          dreamRelationships: res.profile.dreamRelationships || []
        });
      }
    } catch (e) { console.error(e); }
  }
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    // Convert arrays to server-expected form (arrays accepted by your API)
    try {
      await Dream.update(currentUserId, form);
      setEditing(false);
      await load();
    } catch (err) { console.error(err); alert("Save failed") }
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <div className="flex items-center gap-4">
        <img src={profile?.dreamAvatar || form.dreamAvatar || "https://via.placeholder.com/140"} className="w-28 h-28 rounded-full object-cover" alt="dream avatar" />
        <div>
          <h2 className="text-2xl font-bold">{profile?.dreamCareer || form.dreamCareer || "Dream Career"}</h2>
          <p className="text-gray-600">{profile?.dreamLifestyle || form.dreamLifestyle}</p>
        </div>
        <div className="ml-auto">
          <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={()=>setEditing(!editing)}>{editing ? "Cancel" : "Edit Dream"}</button>
        </div>
      </div>

      {editing ? (
        <form onSubmit={save} className="space-y-2">
          <input placeholder="Dream Avatar URL" className="border p-2 w-full" value={form.dreamAvatar} onChange={e=>setForm({...form, dreamAvatar:e.target.value})} />
          <input placeholder="Dream Career" className="border p-2 w-full" value={form.dreamCareer} onChange={e=>setForm({...form, dreamCareer:e.target.value})} />
          <input placeholder="Lifestyle" className="border p-2 w-full" value={form.dreamLifestyle} onChange={e=>setForm({...form, dreamLifestyle:e.target.value})} />
          <textarea placeholder="Dream bio" className="border p-2 w-full" value={form.dreamBio} onChange={e=>setForm({...form, dreamBio:e.target.value})} />
          <small className="text-gray-600">Hobbies / Skills / Locations / Relationships: comma-separated, or use arrays</small>
          <input placeholder="Hobbies (comma separated)" className="border p-2 w-full" value={form.dreamHobbies.join(", ")} onChange={e=>setForm({...form, dreamHobbies: e.target.value.split(",").map(s=>s.trim())})} />
          <input placeholder="Skills" className="border p-2 w-full" value={form.dreamSkills.join(", ")} onChange={e=>setForm({...form, dreamSkills: e.target.value.split(",").map(s=>s.trim())})} />
          <input placeholder="Travel locations" className="border p-2 w-full" value={form.dreamTravelLocations.join(", ")} onChange={e=>setForm({...form, dreamTravelLocations: e.target.value.split(",").map(s=>s.trim())})} />
          <input placeholder="Relationships" className="border p-2 w-full" value={form.dreamRelationships.join(", ")} onChange={e=>setForm({...form, dreamRelationships: e.target.value.split(",").map(s=>s.trim())})} />

          <div className="text-right">
            <button className="bg-green-600 text-white px-4 py-1 rounded">Save Dream</button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <h3 className="font-semibold">Bio</h3>
            <p>{profile?.dreamBio || "No dream bio yet."}</p>
          </div>

          <div>
            <h3 className="font-semibold">Hobbies</h3>
            <div className="flex gap-2 flex-wrap">
              {(profile?.dreamHobbies || form.dreamHobbies).map((h,i) => <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{h}</span>)}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Skills</h3>
            <div className="flex gap-2 flex-wrap">
              {(profile?.dreamSkills || form.dreamSkills).map((h,i) => <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{h}</span>)}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Travel Locations</h3>
            <div className="flex gap-2 flex-wrap">
              {(profile?.dreamTravelLocations || form.dreamTravelLocations).map((h,i) => <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{h}</span>)}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Relationships</h3>
            <div className="flex gap-2 flex-wrap">
              {(profile?.dreamRelationships || form.dreamRelationships).map((h,i) => <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{h}</span>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

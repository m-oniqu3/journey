import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useState } from "react";

function EditProfile() {
  const [profile, setProfile] = useState({
    username: "",
    diplayName: "",
    bio: "",
    avatar: "",
    banner: "",
  });

  return (
    <form className="space-y-6 md:w-8/12 md:mx-auto xl:w-6/12">
      <header className="relative">
        <figure>
          <div
            id="banner"
            className="bg-grayscale-100 rounded-xl h-40 w-full"
          />
        </figure>

        <figure>
          <div className="rounded-full bg-grayscale-100 h-28 w-28  border-4 border-white  relative -top-14 left-8" />
        </figure>
      </header>

      <div className="grid grid-cols-1  gap-4 md:grid-cols-2">
        <div className="">
          <InputField
            label="Username"
            type="text"
            value={profile.username}
            name="username"
            setValue={(value) =>
              setProfile((prev) => ({ ...prev, username: value }))
            }
          />
        </div>

        <div className="">
          <InputField
            label="Display Name"
            type="text"
            value={profile.diplayName}
            name="username"
            setValue={(value) =>
              setProfile((prev) =>
                Object.assign({}, prev, { diplayName: value })
              )
            }
          />
        </div>
      </div>

      {/* Bio */}
      <textarea
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-slate-300 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-32"
        placeholder="Bio"
      />

      <Button className="w-fit bg-accent text-neutral">Save</Button>
    </form>
  );
}

export default EditProfile;

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { showSuccess, showError } from "@/utils/toast";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User, Lock, Camera } from "lucide-react";

export default function Profile() {
  const { profile, user, refreshProfile } = useAuth();
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
    }
  }, [profile]);

  const updateProfile = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
      })
      .eq("id", user.id);

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Profile updated successfully");
      await refreshProfile();
    }
    setLoading(false);
  };

  const updatePassword = async () => {
    if (!newPassword) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Password updated successfully");
      setNewPassword("");
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}-${Math.random()}.${fileExt}`;

    setLoading(true);
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      showError(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      showError(updateError.message);
    } else {
      showSuccess("Avatar updated successfully");
      await refreshProfile();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-black dark:text-white">Profile Settings</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 dark:bg-zinc-900 border-none shadow-xl">
            <CardContent className="pt-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-32 h-32 mx-auto">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="text-2xl font-bold bg-indigo-50 text-indigo-600">
                    {firstName?.[0]}{lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input type="file" className="hidden" onChange={handleAvatarUpload} disabled={loading} accept="image/*" />
                </label>
              </div>
              <h2 className="text-xl font-bold dark:text-white">{firstName} {lastName}</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">{user?.email}</p>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-8">
            <Card className="dark:bg-zinc-900 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <User className="w-5 h-5" /> Personal Info
                </CardTitle>
                <CardDescription className="dark:text-zinc-400">Update your name and appearance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="dark:text-zinc-300">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="dark:bg-zinc-800 dark:text-zinc-100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="dark:text-zinc-300">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="dark:bg-zinc-800 dark:text-zinc-100" />
                  </div>
                </div>
                <Button onClick={updateProfile} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="dark:bg-zinc-900 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Lock className="w-5 h-5" /> Security
                </CardTitle>
                <CardDescription className="dark:text-zinc-400">Keep your account safe by updating your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="dark:text-zinc-300">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="dark:bg-zinc-800 dark:text-zinc-100" />
                </div>
                <Button onClick={updatePassword} disabled={loading || !newPassword} variant="secondary" className="w-full">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
import { getSession } from "@/lib/session";
import TeamCreatePage from "@/clientpages/team/TeamCreatePage";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    teamName: z.string(),
    teamDescription: z.string().max(100)
});

export default function TeamCreatePage() {
    const [teamMember, setTeamMember] = useState("");
    const [members, setMembers] = useState([]);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "",
            teamDescription: ""
        }
    });

    function addMember() {
        setTeamMember("");
        if (members.includes(teamMember)) {
            return;
        }
        setMembers([...members, teamMember]);
    };

    async function onSubmit(values) {
        // const createTeam = await axios.post("", {}, {
        //     method: "POST"
        // });
        console.log(values);
        router.reload();
    };

    return (
        <TeamCreatePage token={token} />
    )
}
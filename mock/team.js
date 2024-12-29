import {
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    users
} from "./user";

export const teamListMock = [
    {
        id: 1,
        name: "Team 1",
        description: "Description 1",
        members: [user1, user2, user7]
    },
    {
        id: 2,
        name: "Team 2",
        description: "Description 2",
        members: [user3, user4, user8]
    },
    {
        id: 3,
        name: "Team 3",
        description: "Description 3",
        members: [user4, user5, user6]
    },
    {
        id: 4,
        name: "Team 4",
        description: "Description 4",
        members: [users]
    }
];
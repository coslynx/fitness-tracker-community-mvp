import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const friends = await prisma.user.findMany({
        where: {
          id: {
            not: session.user.id,
          },
        },
        include: {
          friends: {
            where: {
              userId: session.user.id,
            },
          },
        },
      });

      const formattedFriends = friends.map((friend) => ({
        ...friend,
        isFriend: friend.friends.length > 0,
      }));

      return res.status(200).json(formattedFriends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      return res.status(500).json({ message: "Error fetching friends" });
    }
  } else if (req.method === "POST") {
    try {
      const friendId = req.body.id;
      const newFriend = await prisma.friend.create({
        data: {
          userId: session.user.id,
          friendId,
        },
      });

      return res.status(201).json(newFriend);
    } catch (error) {
      console.error("Error adding friend:", error);
      return res.status(500).json({ message: "Error adding friend" });
    }
  } else if (req.method === "DELETE") {
    try {
      const friendId = req.query.id;
      await prisma.friend.deleteMany({
        where: {
          userId: session.user.id,
          friendId: parseInt(friendId, 10),
        },
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting friend:", error);
      return res.status(500).json({ message: "Error deleting friend" });
    }
  } else if (req.method === "PUT") {
    try {
      const friendId = req.query.id;
      const action = req.query.action;

      if (action === "connect") {
        const connectedFriend = await prisma.friend.create({
          data: {
            userId: session.user.id,
            friendId: parseInt(friendId, 10),
          },
        });
        return res.status(201).json(connectedFriend);
      } else if (action === "disconnect") {
        await prisma.friend.deleteMany({
          where: {
            userId: session.user.id,
            friendId: parseInt(friendId, 10),
          },
        });
        return res.status(204).send();
      } else {
        return res.status(400).json({ message: "Invalid action" });
      }
    } catch (error) {
      console.error("Error connecting/disconnecting friend:", error);
      return res
        .status(500)
        .json({ message: "Error connecting/disconnecting friend" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
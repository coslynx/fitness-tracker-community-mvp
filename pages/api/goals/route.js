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
      const goals = await prisma.goal.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return res.status(200).json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      return res.status(500).json({ message: "Error fetching goals" });
    }
  } else if (req.method === "POST") {
    try {
      const goalData = JSON.parse(req.body);
      const newGoal = await prisma.goal.create({
        data: {
          ...goalData,
          userId: session.user.id,
        },
      });
      return res.status(201).json(newGoal);
    } catch (error) {
      console.error("Error creating goal:", error);
      return res.status(500).json({ message: "Error creating goal" });
    }
  } else if (req.method === "PUT") {
    try {
      const goalId = req.query.id;
      const goalData = JSON.parse(req.body);
      const updatedGoal = await prisma.goal.update({
        where: {
          id: parseInt(goalId, 10),
        },
        data: {
          ...goalData,
        },
      });
      return res.status(200).json(updatedGoal);
    } catch (error) {
      console.error("Error updating goal:", error);
      return res.status(500).json({ message: "Error updating goal" });
    }
  } else if (req.method === "DELETE") {
    try {
      const goalId = req.query.id;
      await prisma.goal.delete({
        where: {
          id: parseInt(goalId, 10),
        },
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting goal:", error);
      return res.status(500).json({ message: "Error deleting goal" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
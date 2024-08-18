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
      const workouts = await prisma.workout.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return res.status(200).json(workouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      return res.status(500).json({ message: "Error fetching workouts" });
    }
  } else if (req.method === "POST") {
    try {
      const workoutData = JSON.parse(req.body);
      const newWorkout = await prisma.workout.create({
        data: {
          ...workoutData,
          userId: session.user.id,
        },
      });
      return res.status(201).json(newWorkout);
    } catch (error) {
      console.error("Error creating workout:", error);
      return res.status(500).json({ message: "Error creating workout" });
    }
  } else if (req.method === "PUT") {
    try {
      const workoutId = req.query.id;
      const workoutData = JSON.parse(req.body);
      const updatedWorkout = await prisma.workout.update({
        where: {
          id: parseInt(workoutId, 10),
        },
        data: {
          ...workoutData,
        },
      });
      return res.status(200).json(updatedWorkout);
    } catch (error) {
      console.error("Error updating workout:", error);
      return res.status(500).json({ message: "Error updating workout" });
    }
  } else if (req.method === "DELETE") {
    try {
      const workoutId = req.query.id;
      await prisma.workout.delete({
        where: {
          id: parseInt(workoutId, 10),
        },
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting workout:", error);
      return res.status(500).json({ message: "Error deleting workout" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block bg-[#111318] rounded-xl overflow-hidden border border-white/5 hover:border-[#ccff00]/40 transition"
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-3">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="bg-[#ccff00] text-black text-[10px] font-bold uppercase px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-white font-bold uppercase text-sm mb-1">
          {workout.name}
        </h3>
        <p className="text-gray-400 text-xs mb-3">{workout.equipment}</p>

        <div className="border-t border-white/10 pt-3 flex items-center gap-4 text-gray-300 text-xs">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-[#ccff00]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
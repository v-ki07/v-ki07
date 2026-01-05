import { MoodEntry, MOOD_CONFIG, MoodType } from "@/types/mood";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, parseISO } from "date-fns";
import { TrendingUp, Smile, Calendar } from "lucide-react";

interface MoodAnalyticsProps {
  entries: MoodEntry[];
}

const moodValues: Record<MoodType, number> = {
  terrible: 1,
  bad: 2,
  neutral: 3,
  good: 4,
  great: 5,
};

export const MoodAnalytics = ({ entries }: MoodAnalyticsProps) => {
  const chartData = [...entries]
    .reverse()
    .slice(-7)
    .map((e) => ({
      date: format(parseISO(e.date), "MMM d"),
      value: moodValues[e.mood],
    }));

  const mostFrequentMood = entries.length > 0
    ? entries.reduce((acc, curr) => {
        acc[curr.mood] = (acc[curr.mood] || 0) + 1;
        return acc;
      }, {} as Record<MoodType, number>)
    : null;

  const topMood = mostFrequentMood 
    ? (Object.entries(mostFrequentMood).sort((a, b) => b[1] - a[1])[0][0] as MoodType)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="md:col-span-2 border-none shadow-lg dark:bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Weekly Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-zinc-800" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
              <YAxis hide domain={[1, 5]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--card)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={3} 
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-none shadow-lg bg-indigo-50 dark:bg-indigo-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Primary Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topMood ? (
              <div className="flex items-center gap-3">
                <span className="text-4xl">{MOOD_CONFIG[topMood].emoji}</span>
                <span className="font-bold text-xl capitalize text-indigo-900 dark:text-indigo-100">{topMood}</span>
              </div>
            ) : (
              <p className="text-sm text-indigo-400 dark:text-indigo-500 italic">No entries yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Total Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-purple-900 dark:text-purple-100">{entries.length}</span>
            <span className="ml-2 text-sm text-purple-400 dark:text-purple-500">Entries</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
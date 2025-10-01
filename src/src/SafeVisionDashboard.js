import React, { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { Bell, MapPin, Phone, Settings, Users, AlertTriangle, Clock, ChevronLeft, Download } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Helper: make Arabic date/time string
const fmtDateTime = (d) => new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(d);

// Dummy seed data (7 days)
const seedIncidentTypes = ["إغماء", "ازدحام", "سقوط"];
const locations = ["الحرم", "الساحة الشمالية", "الساحة الجنوبية", "بوابة الملك فهد", "منطقة الحافلات"];

function genIncidents(days = 7) {
  const now = new Date();
  let id = 1;
  const arr = [];
  for (let d = 0; d < days; d++) {
    for (let i = 0; i < Math.floor(6 + Math.random() * 6); i++) {
      const when = new Date(now.getTime() - d * 86400000 - Math.floor(Math.random() * 8) * 3600000);
      const type = seedIncidentTypes[Math.floor(Math.random() * seedIncidentTypes.length)];
      const conf = Math.floor(70 + Math.random() * 30);
      const priority = conf > 90 ? "عالي" : conf > 80 ? "متوسط" : "منخفض";
      arr.push({
        id: String(id++),
        type,
        location: locations[Math.floor(Math.random() * locations.length)],
        time: when.toISOString(),
        confidence: conf,
        priority,
        status: ["Open", "Dispatched", "Resolved"][Math.floor(Math.random() * 3)],
      });
    }
  }
  return arr.sort((a, b) => new Date(b.time) - new Date(a.time));
}

const initialIncidents = genIncidents(7);

export default function SafeVisionDashboard() {
  const [incidents, setIncidents] = useState(initialIncidents);

  // KPIs
  const kpis = useMemo(() => ({
    activeCameras: 128,
    incidentsToday: incidents.filter(i => new Date(i.time).toDateString() === new Date().toDateString()).length,
    avgResponse: 6 + Math.floor(Math.random() * 6),
    onDuty: 17,
  }), [incidents]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA] text-[#111] p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D0021B] grid place-items-center text-white font-bold">SV</div>
          <div>
            <div className="font-semibold">Safe Vision</div>
            <div className="text-xs text-[#666]">Saudi Red Crescent</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[#666]">{fmtDateTime(new Date())}</span>
          <Settings className="w-5 h-5 text-[#666]" />
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-[#666]">الكاميرات النشطة</div>
          <div className="text-2xl font-bold">{kpis.activeCameras}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-[#666]">بلاغات اليوم</div>
          <div className="text-2xl font-bold">{kpis.incidentsToday}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-[#666]">متوسط زمن الاستجابة (د)</div>
          <div className="text-2xl font-bold">{kpis.avgResponse}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-[#666]">المتطوعون في النوبة</div>
          <div className="text-2xl font-bold">{kpis.onDuty}</div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-4 shadow mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#D0021B]" />
          <h2 className="font-semibold">التنبيهات الحية</h2>
        </div>
        <div className="space-y-2 max-h-64 overflow-auto">
          {incidents.slice(0, 5).map(a => (
            <div key={a.id} className="border rounded-xl p-3 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">{a.type} — {a.location}</span>
                <span className="text-xs text-[#666]">{fmtDateTime(new Date(a.time))}</span>
              </div>
              <div className="text-xs text-[#666]">الثقة: {a.confidence}% | الأولوية: {a.priority}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="font-semibold mb-3">البلاغات حسب الساعة</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Array.from({ length: 24 }, (_, h) => ({
              hour: h,
              count: incidents.filter(i => new Date(i.time).getHours() === h).length
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#D0021B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

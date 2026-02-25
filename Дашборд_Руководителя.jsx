import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const C = {
  burg: "#6B2D3E", burgL: "#8a4a5c", burgD: "#4a1e2b", burgBg: "#f7f0f2",
  dark: "#1a1a1a", muted: "#8a8a8a", border: "#e8e0e3",
  white: "#fff", bg: "#faf8f9",
  c1: "#6B2D3E", c2: "#2E86AB", c3: "#A23B72", c4: "#F18F01", c5: "#C73E1D", c6: "#3B7A57", c7: "#5C4D7D",
  green: "#22c55e", red: "#ef4444", amber: "#f59e0b",
};

const weekData = [
  { w: "Н-6", margin: 118, shipments: 42, newClients: 3, claims: 2 },
  { w: "Н-5", margin: 135, shipments: 48, newClients: 5, claims: 1 },
  { w: "Н-4", margin: 122, shipments: 44, newClients: 2, claims: 3 },
  { w: "Н-3", margin: 156, shipments: 52, newClients: 6, claims: 1 },
  { w: "Н-2", margin: 148, shipments: 50, newClients: 4, claims: 0 },
  { w: "Н-1", margin: 171, shipments: 55, newClients: 7, claims: 1 },
  { w: "Тек.", margin: 164, shipments: 51, newClients: 5, claims: 0 },
];

const pipeData = [
  { stage: "Новая заявка", count: 23, color: C.c2 },
  { stage: "КП отправлено", count: 18, color: C.c3 },
  { stage: "Подтверждена", count: 12, color: C.c4 },
  { stage: "В работе", count: 31, color: C.c4 },
  { stage: "Доставлен", count: 14, color: C.c5 },
  { stage: "Документы", count: 9, color: C.c6 },
  { stage: "Оплачен", count: 22, color: C.c1 },
];

const marginByType = [
  { name: "Тендеры", value: 14.2, target: 12, color: C.c3 },
  { name: "Прямые", value: 18.7, target: 15, color: C.c4 },
  { name: "Новые", value: 22.1, target: 20, color: C.c2 },
];

const employees = [
  { name: "Иванова А.", role: "Менеджер входящих", div: 2, stats: { main: 87, trend: "up", label: "заявок/нед" }},
  { name: "Петров С.", role: "Тендер-специалист", div: 3, stats: { main: 4, trend: "up", label: "контрактов/нед" }},
  { name: "Козлов Д.", role: "Хантер-менеджер", div: 3, stats: { main: 3, trend: "same", label: "контрактов/нед" }},
  { name: "Сидорова Е.", role: "Фармер-менеджер", div: 4, stats: { main: 82, trend: "up", label: "тыс BYN маржи" }},
  { name: "Белов А.", role: "Фармер-менеджер", div: 4, stats: { main: 64, trend: "down", label: "тыс BYN маржи" }},
  { name: "Кузнецова М.", role: "Документовед", div: 6, stats: { main: 18, trend: "up", label: "комплектов/нед" }},
];

const divisions = [
  { n: 1, name: "Управление", color: C.c1, kpis: [
    { label: "Маржа подразд.", value: "164K", unit: "BYN/нед", status: "ok" },
    { label: "% плана", value: "82%", status: "warn" },
    { label: "Формулы", value: "6/6", status: "ok" },
  ]},
  { n: 2, name: "Коммуникация", color: C.c2, kpis: [
    { label: "Заявок", value: "87", unit: "/нед", status: "ok" },
    { label: "Время ответа", value: "12 мин", status: "ok" },
    { label: "12/12 полей", value: "94%", status: "ok" },
  ]},
  { n: 3, name: "Продажи", color: C.c3, kpis: [
    { label: "Контрактов", value: "7", unit: "/нед", status: "ok" },
    { label: "Маржа новых", value: "48K", unit: "BYN", status: "ok" },
    { label: "Конверсия", value: "31%", status: "ok" },
  ]},
  { n: 4, name: "Производство", color: C.c4, kpis: [
    { label: "Маржа портф.", value: "164K", unit: "BYN/нед", status: "ok" },
    { label: "Без претензий", value: "98%", status: "ok" },
    { label: "LTV рост", value: "+12%", status: "ok" },
  ]},
  { n: 5, name: "Качество", color: C.c5, kpis: [
    { label: "В срок", value: "96%", status: "ok" },
    { label: "Претензии/мес", value: "2", status: "ok" },
    { label: "NPS", value: "72", status: "warn" },
  ]},
  { n: 6, name: "Финансы", color: C.c6, kpis: [
    { label: "Закрыто", value: "18", unit: "компл/нед", status: "ok" },
    { label: "Ср. закрытие", value: "2.4 дн", status: "ok" },
    { label: "Просроч. ДЗ", value: "12K", unit: "BYN", status: "warn" },
  ]},
  { n: 7, name: "Хозяйство", color: C.c7, kpis: [
    { label: "CRM uptime", value: "99.8%", status: "ok" },
    { label: "Шляпы актуальны", value: "6/6", status: "ok" },
    { label: "База ТС", value: "347", status: "ok" },
  ]},
];

const StatusDot = ({ status }) => (
  <span style={{
    display: "inline-block", width: 8, height: 8, borderRadius: "50%", marginRight: 6,
    background: status === "ok" ? C.green : status === "warn" ? C.amber : C.red,
    boxShadow: `0 0 6px ${status === "ok" ? C.green : status === "warn" ? C.amber : C.red}44`,
  }} />
);

const TrendIcon = ({ trend }) => {
  if (trend === "up") return <span style={{ color: C.green, fontWeight: 700, fontSize: 14 }}>▲</span>;
  if (trend === "down") return <span style={{ color: C.red, fontWeight: 700, fontSize: 14 }}>▼</span>;
  return <span style={{ color: C.amber, fontWeight: 700, fontSize: 14 }}>●</span>;
};

const Card = ({ children, style }) => (
  <div style={{
    background: C.white, borderRadius: 10, border: `1px solid ${C.border}`,
    boxShadow: "0 1px 4px rgba(107,45,62,0.06)", ...style,
  }}>{children}</div>
);

const SectionTitle = ({ children, color }) => (
  <div style={{
    fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
    color: color || C.burg, padding: "10px 14px 6px", borderBottom: `2px solid ${color || C.burg}22`,
  }}>{children}</div>
);

export default function Dashboard() {
  const [activeDiv, setActiveDiv] = useState(null);
  const [view, setView] = useState("week");

  const totalMargin = 164;
  const planPercent = 82;
  const totalShipments = 51;
  const activeClients = 38;

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, fontFamily: "'PT Sans', 'Segoe UI', sans-serif",
      color: C.dark, padding: 0,
    }}>
      {/* HEADER */}
      <div style={{
        background: `linear-gradient(135deg, ${C.burgD} 0%, ${C.burg} 50%, ${C.burgL} 100%)`,
        padding: "16px 24px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(107,45,62,0.25)",
      }}>
        <div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
            ДАШБОРД РУКОВОДИТЕЛЯ
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
            Подразделение международных грузоперевозок · 7 отделений · 11 позиций
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["week", "month"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.3)",
              background: view === v ? "rgba(255,255,255,0.2)" : "transparent",
              color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {v === "week" ? "Неделя" : "Месяц"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px", maxWidth: 1400, margin: "0 auto" }}>

        {/* TOP KPI ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { label: "МАРЖА", value: `${totalMargin}K`, unit: "BYN/нед", delta: "+10.8%", deltaOk: true, icon: "💰" },
            { label: "% ПЛАНА", value: `${planPercent}%`, unit: "цель: 2M/мес", delta: "−18%", deltaOk: false, icon: "🎯" },
            { label: "РЕЙСОВ", value: totalShipments, unit: "/нед", delta: "+2", deltaOk: true, icon: "🚛" },
            { label: "АКТИВНЫХ КЛИЕНТОВ", value: activeClients, unit: "компаний", delta: "+5", deltaOk: true, icon: "🤝" },
          ].map((kpi, i) => (
            <Card key={i} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.muted }}>{kpi.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: C.burg, lineHeight: 1.1, marginTop: 4 }}>
                    {kpi.value}
                    <span style={{ fontSize: 14, fontWeight: 400, color: C.muted, marginLeft: 6 }}>{kpi.unit}</span>
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 600, marginTop: 4,
                    color: kpi.deltaOk ? C.green : C.red,
                  }}>{kpi.delta} vs прошл. нед.</div>
                </div>
                <div style={{ fontSize: 36, opacity: 0.7 }}>{kpi.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>

          {/* MARGIN TREND */}
          <Card>
            <SectionTitle>Динамика маржи (тыс. BYN / неделя)</SectionTitle>
            <div style={{ padding: "8px 8px 4px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id="gm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.burg} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={C.burg} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="w" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => [`${v}K BYN`, "Маржа"]} />
                  <Area type="monotone" dataKey="margin" stroke={C.burg} strokeWidth={2.5} fill="url(#gm)" dot={{ fill: C.burg, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* PIPELINE */}
          <Card>
            <SectionTitle color={C.c4}>Воронка CRM — текущие сделки</SectionTitle>
            <div style={{ padding: "8px 8px 4px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={pipeData} layout="vertical" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip formatter={(v) => [v, "Сделок"]} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {pipeData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* 7 DIVISIONS STRIP */}
        <Card style={{ marginBottom: 16 }}>
          <SectionTitle>7 отделений — статус KPI</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0 }}>
            {divisions.map((d) => (
              <div
                key={d.n}
                onClick={() => setActiveDiv(activeDiv === d.n ? null : d.n)}
                style={{
                  padding: "10px 10px 8px", cursor: "pointer", borderRight: d.n < 7 ? `1px solid ${C.border}` : "none",
                  background: activeDiv === d.n ? `${d.color}08` : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 6, background: d.color,
                    color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{d.n}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: d.color, textTransform: "uppercase", letterSpacing: 0.5 }}>{d.name}</div>
                </div>
                {d.kpis.map((k, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "3px 0", fontSize: 12 }}>
                    <StatusDot status={k.status} />
                    <span style={{ color: C.muted, flex: 1 }}>{k.label}</span>
                    <span style={{ fontWeight: 700 }}>{k.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* BOTTOM ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>

          {/* MARGIN BY TYPE */}
          <Card>
            <SectionTitle color={C.c3}>Маржинальность по типам</SectionTitle>
            <div style={{ padding: 12 }}>
              {marginByType.map((m, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{m.name}</span>
                    <span style={{ fontWeight: 700, color: m.value >= m.target ? C.green : C.red }}>{m.value}%
                      <span style={{ fontWeight: 400, color: C.muted, marginLeft: 4 }}>/ мин {m.target}%</span>
                    </span>
                  </div>
                  <div style={{ height: 10, background: "#f0ebed", borderRadius: 5, overflow: "hidden", position: "relative" }}>
                    <div style={{
                      position: "absolute", left: `${(m.target / 30) * 100}%`, top: 0, bottom: 0, width: 2,
                      background: C.dark, opacity: 0.3, zIndex: 2,
                    }} />
                    <div style={{
                      height: "100%", width: `${(m.value / 30) * 100}%`, borderRadius: 5,
                      background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* EMPLOYEES */}
          <Card>
            <SectionTitle color={C.c2}>Сотрудники — статистики</SectionTitle>
            <div style={{ padding: "6px 10px" }}>
              {employees.map((e, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", padding: "6px 0",
                  borderBottom: i < employees.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", background: divisions.find(d => d.n === e.div)?.color || C.burg,
                    color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                    marginRight: 8, flexShrink: 0,
                  }}>{e.div}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{e.role}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>
                      {e.stats.main} <TrendIcon trend={e.stats.trend} />
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>{e.stats.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SHIPMENTS + CLAIMS */}
          <Card>
            <SectionTitle color={C.c5}>Рейсы и претензии</SectionTitle>
            <div style={{ padding: "8px 8px 4px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weekData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="w" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="shipments" name="Рейсов" fill={C.c4} radius={[3, 3, 0, 0]} barSize={22} />
                  <Bar dataKey="claims" name="Претензий" fill={C.c5} radius={[3, 3, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

        </div>

        {/* FOOTER */}
        <div style={{
          marginTop: 16, padding: "10px 16px", background: `${C.burg}08`, borderRadius: 8,
          border: `1px solid ${C.burg}15`, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 12, color: C.muted }}>
            ЦКП подразделения: <span style={{ fontWeight: 700, color: C.burg }}>Управляемые, надёжные, прибыльные международные грузоперевозки с маржой ≥ 15%</span>
          </div>
          <div style={{ fontSize: 11, color: C.muted }}>Обновление: {new Date().toLocaleDateString("ru-RU")} · Неделя {Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 604800000)}</div>
        </div>

      </div>
    </div>
  );
}

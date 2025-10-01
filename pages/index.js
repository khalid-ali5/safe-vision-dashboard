import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Safe Vision Dashboard</title>
      </Head>
      <main style={{ fontFamily: "Arial, sans-serif", direction: "rtl" }}>
        
        {/* 🚨 شريط التنبيه */}
        <div style={{
          backgroundColor: "red",
          color: "white",
          padding: "15px",
          fontSize: "18px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          🚨 حالة إغماء — الساحة الشمالية — 2:15 م
        </div>

        {/* 🗺️ خريطة تجريبية (صورة ثابتة) */}
        <div style={{ margin: "20px auto", textAlign: "center" }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Mecca_from_Satellite.jpg/640px-Mecca_from_Satellite.jpg" 
            alt="خريطة مكة"
            style={{ width: "90%", borderRadius: "12px" }}
          />
        </div>

        {/* 🔘 الأزرار */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button style={{
            backgroundColor: "green",
            color: "white",
            padding: "15px 25px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            ✅ أنا بالطريق
          </button>
          <button style={{
            backgroundColor: "blue",
            color: "white",
            padding: "15px 25px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            🆘 طلب دعم
          </button>
        </div>

      </main>
    </>
  );
}

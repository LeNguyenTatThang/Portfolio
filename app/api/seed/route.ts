import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("blogs").insert([
    {
      title: "Hiểu sâu về Promise, Async/Await và luồng bất đồng bộ trong JavaScript",
      slug: "hieu-sau-ve-promise-async-await",
      cover_image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      published_at: "2025-11-03",
      content: String.raw`
# Hiểu sâu về Promise, Async/Await và luồng bất đồng bộ trong JavaScript

JavaScript có một **cơ chế bất đồng bộ (asynchronous)** cực kỳ mạnh mẽ giúp ta viết code chạy mượt mà, không chặn UI, đặc biệt trong môi trường **frontend và backend event-driven** như Node.js.  
Bài viết này sẽ giúp bạn đi sâu vào **Promise**, **Async/Await** và cách chúng hoạt động cùng **Event Loop**.

---

## ⚡ Callback Hell – Khởi đầu của mọi rắc rối

Trước khi có Promise, JavaScript xử lý bất đồng bộ bằng **callback**.  
Ví dụ:

\`\`\`js
getUser(function (user) {
  getOrders(user.id, function (orders) {
    getOrderDetails(orders[0].id, function (details) {
      console.log(details);
    });
  });
});
\`\`\`

Kết quả: **callback hell**, code khó đọc và khó debug.

---

## 🧩 Promise – Cứu tinh của bất đồng bộ

Promise là một **đối tượng đại diện cho giá trị trong tương lai**.  
Một Promise có 3 trạng thái:

- \`pending\` – đang chờ xử lý  
- \`fulfilled\` – đã hoàn thành  
- \`rejected\` – bị lỗi  

\`\`\`js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("✅ Dữ liệu đã tải xong!");
    else reject("❌ Lỗi tải dữ liệu!");
  }, 1000);
});

fetchData
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
\`\`\`

---

## 🔄 Promise chaining

Bạn có thể **chuỗi nhiều promise** để xử lý logic liên tiếp:

\`\`\`js
fetchUser()
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => console.log(comments))
  .catch((err) => console.error("Lỗi:", err));
\`\`\`

Thay vì callback hell, code rõ ràng và tuyến tính hơn.

---

## 💤 Async/Await – Viết code bất đồng bộ như đồng bộ

\`async\` và \`await\` là cú pháp giúp bạn **viết Promise code như synchronous**.

\`\`\`js
async function loadData() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}
\`\`\`

Code dễ đọc, dễ debug, nhưng vẫn chạy bất đồng bộ!

---

## ⚙️ Promise.all & Promise.race

Khi cần chạy **nhiều tác vụ cùng lúc**, bạn có thể dùng:

| Hàm | Mô tả |
|------|-------|
| **Promise.all([...])** | Chờ *tất cả* Promise hoàn thành, hoặc fail nếu có 1 lỗi |
| **Promise.race([...])** | Trả về Promise hoàn thành sớm nhất |
| **Promise.allSettled([...])** | Luôn trả về kết quả của tất cả, kể cả lỗi |

\`\`\`js
const p1 = fetch("/api/user");
const p2 = fetch("/api/posts");

const [user, posts] = await Promise.all([p1, p2]);
console.log(user, posts);
\`\`\`

---

## 🧠 Khi nào nên dùng Async/Await?

| Tình huống | Giải pháp tốt nhất |
|-------------|--------------------|
| Chạy tuần tự có phụ thuộc | **Async/Await** |
| Chạy song song độc lập | **Promise.all** |
| Gọi nhiều API không liên quan | **Promise.allSettled** |
| Dừng sớm khi có lỗi | **Promise.race** |

---

## 🧵 Mối quan hệ giữa Promise và Event Loop

Promise hoạt động trong **Microtask Queue**, nghĩa là:

- Chạy **ngay sau** khi Stack trống  
- **Trước** các Macrotask như \`setTimeout\`

\`\`\`js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Output:
// Start
// End
// Promise
// Timeout
\`\`\`

---

## 💡 Tổng kết

| Kiến thức | Ý nghĩa |
|------------|---------|
| Callback | Cơ chế bất đồng bộ cơ bản, dễ gây callback hell |
| Promise | Cải thiện cấu trúc bất đồng bộ |
| Async/Await | Cú pháp hiện đại, dễ đọc, dễ debug |
| Event Loop | Điều phối microtask và macrotask |

> Khi bạn hiểu rõ Promise và Event Loop, bạn không chỉ viết code JS tốt hơn —  
> mà còn hiểu sâu hơn **cách JavaScript vận hành bên trong**.

---

### ❤️ Cảm ơn bạn đã đọc!
Nếu thấy bài viết này hữu ích, hãy chia sẻ để lan tỏa kiến thức cho cộng đồng JS nhé!
      `,
      is_published: true,
      tags: ["javascript", "promise", "async-await", "event-loop"],
    },
  ]);

  if (error) {
    console.error("❌ Insert failed:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  console.log("✅ Blog inserted:", data);
  return NextResponse.json({ success: true, data });
}

/* =====================================================================
   NỘI DUNG THIỆP 20/10 (bản pastel) — chỉ cần sửa file này.
   Quy tắc nhỏ:
     • Chữ đặt trong dấu ngoặc kép "..."
     • Mỗi mục trong danh sách [ ... ] cách nhau bằng dấu phẩy ,
     • Dòng bắt đầu bằng // là ghi chú, trang web sẽ bỏ qua.
   ===================================================================== */

window.THIEP = {
  /* Tên người nhận, ví dụ "Linh Chi". Để trống "" thì trang chỉ gọi là "cậu". */
  ten: "",

  /* Người gửi */
  nguoiGui: "Các bạn nam lớp k27CLCQTKDB",

  nhac: {
    file: "nhac/lofi-20-10.wav",   // muốn đổi bài: bỏ file .mp3 vào thư mục nhac rồi sửa tên ở đây
    ten: "lofi cho 20/10",
    caSi: "Các bạn nam lớp k27CLCQTKDB"
  },

  anhCaNhan: "anh/ca-nhan.jpg",

  /* ---------- Phần "tin nhắn" (hiện lần lượt như đang chat) ----------
     {ngay2010} tự đổi theo ngày mở: trước 20/10 → "sắp 20/10 rồi đó nha",
     đúng ngày → "hôm nay 20/10 nè", sau đó → "20/10 vui vẻ nha" */
  tinNhan: [
    "ê cậu ơi 👋",
    "{ngay2010}",
    "tụi tớ có một món quà nhỏ xíu nè 🎁",
    "nhưng phải lướt hết mới nhận được nha 🤭"
  ],

  /* ---------- Thẻ ảnh "main character" ---------- */
  theAnh: {
    tieuDe: "main character của hôm nay ✨",
    nhan: "certified cutie",             // dòng chữ nhỏ trên thẻ
    loiNhan: "ui… cậu đẹp quá 🥺 xinh như mấy bông hoa sau lưng cậu vậy đó",
    chiSo: [                             // mặt sau thẻ: [tên chỉ số, số hiện ra]
      ["độ xinh", "100%"],
      ["độ dễ thương", "101%"],
      ["năng lượng tích cực", "max ⚡"]
    ]
  },

  /* ---------- Danh sách điều ước (chạm để gửi từng điều) ---------- */
  loiChuc: [
    "luôn xinh đẹp & rạng rỡ ✨",
    "cười thật nhiều, buồn thật ít",
    "học đâu chắc đó, thi đâu qua đó 📚",
    "khỏe mạnh, bình an, may mắn 🍀",
    "được thương thật nhiều, mỗi ngày 💗"
  ],

  /* ---------- Ảnh lớp (lướt ngang) ----------
     nho = ảnh nhỏ (anh/lop/nho) · lon = ảnh lớn khi bấm phóng to */
  anhLop: [
    { nho: "anh/lop/nho/01.jpg", lon: "anh/lop/01.jpg", chuThich: "giờ học nhưng vẫn cute 📚" },
    { nho: "anh/lop/nho/02.jpg", lon: "anh/lop/02.jpg", chuThich: "chiều dưới sân D5 🌿" },
    { nho: "anh/lop/nho/03.jpg", lon: "anh/lop/03.jpg", chuThich: "đêm diễn giật Giải Nhì 🏆" },
    { nho: "anh/lop/nho/04.jpg", lon: "anh/lop/04.jpg", chuThich: "ai cũng cười tươi xỉu 😆" },
    { nho: "anh/lop/nho/05.jpg", lon: "anh/lop/05.jpg", chuThich: "hẹn thêm 1000 kỷ niệm nữa nha ✨" }
  ],

  /* ---------- Lá thư (chạm vào phong bì để mở) ---------- */
  loiThu: [
    "nhân ngày 20/10, các bạn nam lớp mình muốn gửi cậu một món quà nhỏ xinh như này nè.",
    "cảm ơn cậu vì đã luôn là một phần thật đẹp của lớp mình — từ những giờ học có nhau, những buổi chiều dưới sân D5, cho tới đêm diễn giật luôn Giải Nhì ấy. có cậu, mọi thứ vui hơn nhiều lắm á.",
    "chúc cậu luôn xinh, luôn rạng rỡ và giữ mãi nụ cười trên môi. học hành suôn sẻ, sức khỏe dồi dào, gặp thật nhiều may mắn, và được thương thật nhiều — không chỉ hôm nay mà cả những ngày bình thường nữa nha.",
    "mong mọi điều cậu ấp ủ đều sẽ nở hoa 🌷",
    "happy 20/10 nhaaa 💗"
  ],

  /* ---------- Màn cuối ---------- */
  loiKet: "chúc cậu mãi xinh, mãi vui, mãi được thương 💗"
};

;(function(){var T=window.THIEP||(window.THIEP={});var up=function(x){return(typeof x==='string'&&x&&!/^(https?:|\/\/|data:|\.\.\/)/.test(x))?'../'+x:x};T.anhCaNhan=up(T.anhCaNhan);if(T.nhac)T.nhac.file=up(T.nhac.file);(T.anhLop||[]).forEach(function(a){a.nho=up(a.nho);a.lon=up(a.lon)});var O={"ten":"Minh Chi","anhCaNhan":"a1-vwes.webp","loiThu":["Nhân ngày 20/10, các bạn nam lớp mình muốn gửi cậu một món quà nhỏ xinh như này nè.","Nhân ngày Phụ nữ Việt Nam, chúc Minh Chi luôn là phiên bản hạnh phúc nhất của chính mình. Mong bạn có thật nhiều cơ hội để khám phá thế giới, nhiều người bạn tốt để sẻ chia và nhiều khoảnh khắc đáng nhớ để sau này nhìn lại vẫn thấy thanh xuân của mình thật đẹp.","Chúc cậu luôn xinh, luôn rạng rỡ và giữ mãi nụ cười trên môi. học hành suôn sẻ, sức khỏe dồi dào, gặp thật nhiều may mắn, và được thương thật nhiều - không chỉ hôm nay mà cả những ngày bình thường nữa nha.","Mong mọi điều cậu ấp ủ đều sẽ nở hoa 🌷","Happy 20/10 nhaaa 💗"]};if(O.nhac)T.nhac=Object.assign({},T.nhac,O.nhac);delete O.nhac;Object.assign(T,O);})();

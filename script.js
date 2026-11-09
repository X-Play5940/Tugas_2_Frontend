/* ==========================================================
   PahamIn: Halaman Masuk
   Interaksi: menu responsif, validasi form, tampilkan sandi.
   Catatan: ini simulasi tampilan. Tidak ada data yang dikirim
   atau disimpan ke server.
   ========================================================== */
'use strict';

/* ---------- Ambil elemen yang dibutuhkan ---------- */
const navToggle      = document.getElementById('nav-toggle');
const mainNav        = document.getElementById('main-nav');
const form           = document.getElementById('login-form');
const emailInput     = document.getElementById('email');
const passwordInput  = document.getElementById('password');
const emailError     = document.getElementById('email-error');
const passwordError  = document.getElementById('password-error');
const togglePassword = document.getElementById('toggle-password');
const formStatus     = document.getElementById('form-status');

const PANJANG_SANDI_MINIMAL = 8;

/* ---------- Komponen 1: menu buka-tutup (layar kecil) ---------- */
navToggle.addEventListener('click', () => {
  const terbuka = mainNav.classList.toggle('terbuka');
  navToggle.setAttribute('aria-expanded', String(terbuka));
});

/* ---------- Fungsi validasi ----------
   Mengembalikan pesan kesalahan, atau string kosong bila valid. */
function pesanEmail(nilai) {
  const email = nilai.trim();
  if (email === '') return 'Email wajib diisi.';
  // Pola sederhana: ada teks, tanda @, domain, dan titik
  const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pola.test(email)) return 'Format email belum benar. Contoh: nama@contoh.com';
  return '';
}

function pesanSandi(nilai) {
  if (nilai === '') return 'Kata sandi wajib diisi.';
  if (nilai.length < PANJANG_SANDI_MINIMAL) {
    return `Kata sandi minimal ${PANJANG_SANDI_MINIMAL} karakter.`;
  }
  return '';
}

/* Tampilkan atau hapus pesan kesalahan pada satu kolom */
function tampilkanError(input, elemenError, pesan) {
  elemenError.textContent = pesan;
  if (pesan) {
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.removeAttribute('aria-invalid');
  }
}

function validasiEmail() {
  const pesan = pesanEmail(emailInput.value);
  tampilkanError(emailInput, emailError, pesan);
  return pesan === '';
}

function validasiSandi() {
  const pesan = pesanSandi(passwordInput.value);
  tampilkanError(passwordInput, passwordError, pesan);
  return pesan === '';
}

/* Validasi saat pengguna selesai mengisi kolom */
emailInput.addEventListener('blur', validasiEmail);
passwordInput.addEventListener('blur', validasiSandi);

/* Setelah kolom pernah salah, perbarui pesan saat pengguna mengetik */
emailInput.addEventListener('input', () => {
  if (emailInput.hasAttribute('aria-invalid')) validasiEmail();
});
passwordInput.addEventListener('input', () => {
  if (passwordInput.hasAttribute('aria-invalid')) validasiSandi();
});

/* ---------- Komponen 2 dan 4: kirim form ---------- */
form.addEventListener('submit', (event) => {
  event.preventDefault();          // jangan muat ulang halaman
  formStatus.textContent = '';

  // Jalankan kedua validasi agar semua pesan tampil sekaligus
  const emailValid = validasiEmail();
  const sandiValid = validasiSandi();

  if (!emailValid) {               // arahkan fokus ke kolom pertama yang salah
    emailInput.focus();
    return;
  }
  if (!sandiValid) {
    passwordInput.focus();
    return;
  }

  // Semua valid: tampilkan pesan sukses (simulasi, tanpa server)
  formStatus.textContent = 'Berhasil masuk (simulasi).';
  passwordInput.value = '';        // kosongkan sandi, tidak disimpan
});

/* ---------- Komponen 3: tampilkan/sembunyikan kata sandi ---------- */
togglePassword.addEventListener('click', () => {
  const sedangTersembunyi = passwordInput.type === 'password';
  passwordInput.type = sedangTersembunyi ? 'text' : 'password';
  togglePassword.textContent = sedangTersembunyi ? 'Sembunyikan' : 'Tampilkan';
  togglePassword.setAttribute('aria-pressed', String(sedangTersembunyi));
  togglePassword.setAttribute(
    'aria-label',
    sedangTersembunyi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'
  );
});

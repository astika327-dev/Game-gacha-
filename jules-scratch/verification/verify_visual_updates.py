from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Buka halaman game
        page.goto("http://localhost:5174/")

        # Tunggu animasi latar belakang
        time.sleep(2)

        # Ambil tangkapan layar keadaan awal
        page.screenshot(path="jules-scratch/verification/verification_visuals_before.png")

        # Gunakan selector yang lebih stabil
        spin_button = page.locator(".spin-button")

        # Klik tombol
        spin_button.click()

        # Tunggu dan verifikasi teks tombol berubah (Playwright akan menunggu otomatis)
        expect(spin_button).to_have_text("Berputar...")

        # Ambil tangkapan layar saat berputar
        page.screenshot(path="jules-scratch/verification/verification_visuals_after.png")

        browser.close()

run()

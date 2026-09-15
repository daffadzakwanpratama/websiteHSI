/**
 * Real-time Countdown Timer for Mandatory Halal Deadline (17 October 2026)
 * Calculates Bulan, Minggu, Hari, Jam, Menit, Detik.
 */
(function () {
  function initCountdown() {
    // Target: 17 October 2026 00:00:00 WIB
    const targetDate = new Date('2026-10-17T00:00:00+07:00').getTime();

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setDigits('cd-month', 0);
        setDigits('cd-week', 0);
        setDigits('cd-day', 0);
        setDigits('cd-hour', 0);
        return;
      }

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const months = Math.floor(totalDays / 30.4375);
      const remainingDaysAfterMonths = totalDays - Math.floor(months * 30.4375);
      const weeks = Math.floor(remainingDaysAfterMonths / 7);
      const days = remainingDaysAfterMonths % 7;

      setDigits('cd-month', months);
      setDigits('cd-week', weeks);
      setDigits('cd-day', days);
      setDigits('cd-hour', hours);
    }

    function setDigits(prefix, value) {
      const formatted = String(Math.max(0, value)).padStart(2, '0');
      const d1 = document.getElementById(`${prefix}-1`);
      const d2 = document.getElementById(`${prefix}-2`);
      if (d1) d1.textContent = formatted[0];
      if (d2) d2.textContent = formatted[1];
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  window.initCountdown = initCountdown;
})();

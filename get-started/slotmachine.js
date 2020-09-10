function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
  symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

var slotMachine = {
  reels: [Object.create(reel), Object.create(reel), Object.create(reel)],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    let line1 = [], line2 = [], line3 = [];
    for (let reel of this.reels) {
      let slot = Object.create(reel);
      // TODO: Declare a position variable and loop
      // TODO: Use temporary object for each slot
      slot.position = (reel.symbols.length + slot.position - 1) % reel.symbols.length;
      line1.push(slot.display());
      slot.position = (reel.symbols.length + slot.position + 1) % reel.symbols.length;
      line2.push(slot.display());
      slot.position = (reel.symbols.length + slot.position + 1) % reel.symbols.length;
      line3.push(slot.display());
    }
    console.log(line1.join(" | "));
    console.log(line2.join(" | "));
    console.log(line3.join(" | "));
  },
};

slotMachine.spin();
slotMachine.display();
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

slotMachine.spin();
slotMachine.display();
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★

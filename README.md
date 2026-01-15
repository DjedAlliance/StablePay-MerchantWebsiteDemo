<!-- Don't delete it -->
<div name="readme-top"></div>

<!-- Organization Logo -->
<div align="center">
  <img alt="StabilityNexus" src="public/StabilityNexus.svg" width="175">
  <img alt="DjedAlliance" src="public/djed-alliance.png" width="175">
  <img alt="StablePay" src="public/StablePay.svg" width="175" />
</div>

&nbsp;

<!-- Organization Name -->
<div align="center">

[![Static Badge](https://img.shields.io/badge/Stable-Pay-D27728?style=for-the-badge&labelColor=F7941D)](https://stability.nexus/)

</div>

<!-- Organization/Project Social Handles -->
<p align="center">
<!-- Telegram -->
<a href="https://t.me/StabilityNexus">
<img src="https://img.shields.io/badge/Telegram-black?style=flat&logo=telegram&logoColor=white&logoSize=auto&color=24A1DE" alt="Telegram Badge"/></a>
&nbsp;&nbsp;
<!-- X (formerly Twitter) -->
<a href="https://x.com/StabilityNexus">
<img src="https://img.shields.io/twitter/follow/StabilityNexus" alt="X (formerly Twitter) Badge"/></a>
&nbsp;&nbsp;
<!-- Discord -->
<a href="https://discord.gg/YzDKeEfWtS">
<img src="https://img.shields.io/discord/995968619034984528?style=flat&logo=discord&logoColor=white&logoSize=auto&label=Discord&labelColor=5865F2&color=57F287" alt="Discord Badge"/></a>
&nbsp;&nbsp;
<!-- Medium -->
<a href="https://news.stability.nexus/">
  <img src="https://img.shields.io/badge/Medium-black?style=flat&logo=medium&logoColor=black&logoSize=auto&color=white" alt="Medium Badge"></a>
&nbsp;&nbsp;
<!-- LinkedIn -->
<a href="https://linkedin.com/company/stability-nexus">
  <img src="https://img.shields.io/badge/LinkedIn-black?style=flat&logo=LinkedIn&logoColor=white&logoSize=auto&color=0A66C2" alt="LinkedIn Badge"></a>
&nbsp;&nbsp;
<!-- Youtube -->
<a href="https://www.youtube.com/@StabilityNexus">
  <img src="https://img.shields.io/youtube/channel/subscribers/UCZOG4YhFQdlGaLugr_e5BKw?style=flat&logo=youtube&logoColor=white&logoSize=auto&labelColor=FF0000&color=FF0000" alt="Youtube Badge"></a>
</p>

&nbsp;
<!-- Project core values and objective -->
<p align="center">
  <strong>
  An open-source SDK <br />
  empowering you to directly accept <br />
  cryptocurrency and stablecoin payments
  free from centralized fintech infrastructure  <br /> 
  </strong>
</p>

---

<!-- Project Description (Start from here) -->
# StablePay Demo Merchant Website

StablePay Demo Merchant Website is an open-source demo application that showcases how
to accept cryptocurrency and stablecoin payments using the StablePay SDK without relying
on centralized fintech infrastructure.

StablePay is a fully decentralized payment solution. When embedded in a website, the
StablePay widget interacts directly with smart contracts on supported blockchains,
with no intermediary servers.

This repository contains a **demo merchant website** that allows customers to:
- Browse products
- Add products to a shopping cart
- Checkout and pay using the StablePay widget

A live demo is available at:
https://demo.stablepay.stability.nexus/

For more information about StablePay, please visit the
[StablePay Main Repository](https://github.com/DjedAlliance/StablePay).

---

## Tech Stack

### Frontend
- React
- TypeScript

### Blockchain
- StablePay SDK
- Ethers.js
- EVM-compatible smart contracts

---

## How to Embed StablePay on a Website

To understand how StablePay is integrated into a checkout flow, refer to the following
files in this repository:

- `checkout-modal.tsx`  
  Demonstrates how the StablePay widget is embedded within the checkout process.

- `package.json`  
  Shows how the `stablepay-sdk` dependency is declared and imported.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js 18+
- npm / yarn / pnpm
- MetaMask or any compatible Web3 wallet browser extension

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/DjedAlliance/StablePay-MerchantWebsiteDemo.git
cd StablePay-MerchantWebsiteDemo


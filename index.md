---
title: 首页
layout: home
---

这里是网站首页的实际内容（Markdown语法）

# 经验分享
- 快速开发
- 静态分析
- 模块化自测验证
- Bug定位
- AI协助解决问题

# 工具分享
- Vim
- just-the-docs

# 密码学技术
- 对称加密
- 非对称加密
- 后量子密码学
- 全同态加密
- 国密

# 编程技术
- Python
- C语言

# 通信技术
- 信号与系统
- 通信原理
- 信息论

# 站外导航
## 密码学规范
- AES规范
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197-upd1.pdf

- AES-GCM规范
https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf

- AES-XTS规范
https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38e.pdf

- AES-CCM规范
https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38c.pdf

- AES ECB/CBC/CTR/OFB/CFB规范
https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38a.pdf

- CKMS密码学密钥管理系统
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-152.pdf
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-130.pdf

- CMAC规范
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-38b.pdf

- ECDSA
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf
https://www.secg.org/sec1-v2.pdf
https://www.secg.org/sec2-v2.pdf

- EdDSA
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf
https://datatracker.ietf.org/doc/rfc8032

- Hash 
(SHA1,SHA224,SHA256,SHA384,SHA512,SHA3-224,SHA3-256,SHA3-384,SHA3-512, SHAKE256)
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf

- HMAC
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.198-1.pdf

- ML-DSA
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf

- ML-KEM
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-227.ipd.pdf

- SLH-DSA
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf

- 随机数RNG
https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf

- RSA
https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf
https://www.rfc-editor.org/rfc/pdfrfc/rfc8017.txt.pdf

## 密码学算法验证
NIST 加密算法验证计划 （CAVP）
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program

> NIST 加密算法验证计划 （CAVP） 提供对已批准（即 FIPS 批准和 NIST 推荐）加密算法及其各个组件的验证测试。加密算法验证是加密模块验证的前提条件。FIPS 批准的算法列表可在 SP 800-140C 和 SP 800-140D 中找到。

1. AES和3DES的 测试向量
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/block-ciphers

2. CMAC, CCM, GCM, XPN, XTS, KeyWrap的 测试向量
https://csrc.nist.gov/Projects/Cryptographic-Algorithm-Validation-Program/CAVP-TESTING-BLOCK-CIPHER-MODES

3. DSA, RSA, ECDSA 测试向量
https://csrc.nist.gov/Projects/Cryptographic-Algorithm-Validation-Program/Digital-Signatures

4. KBKDF 算法的 测试向量
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/key-derivation

5. 密钥管理 - 密钥协议方案 （KAS） 和密钥确认 （SP 800-56A）的 测试向量
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/key-management

6. HMAC测试向量
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/message-authentication

7. DRBG测试向量
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/random-number-generators

8. 安全哈希 SHA-1 SHA-2 SHA-3测试向量
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/secure-hashing

9. 组件 测试向量
ECC-CDH (SP 800-56A),
ECDSA Signature (FIPS 186-4),
KDF (SP 800-135),
RSA PKCS1-v1.5 RSASP1 (FIPS 186-4),
RSA PKCS1-vPSS RSASP1 (FIPS 186-4),
RSADP Decryption (SP 800-56B; PKCS#1 v2.1)
https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/component-testing
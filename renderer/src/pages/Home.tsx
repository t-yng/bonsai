import { Button } from "@renderer/components/Button";
import { EmptyImage } from "@renderer/components/EmptyState";
import { Header } from "@renderer/components/Header";
import { Component, createEffect, Show } from "solid-js";
import { Gallery } from "../components/Gallery/Gallery";
import { useAppStore } from "../store/AppStore";
import styles from "./Home.module.css";
import RoundedAdd from "~icons/material-symbols/add-rounded";
import { useToolbar } from "@renderer/hooks/useToolbar";
import { Main } from "@renderer/components/Main";
import { SimilarImageGallery } from "@renderer/components/SimilarImageGallery";

const Home: Component = () => {
  const [state, { getSimilarImageGroups }] = useAppStore();
  const { loadImages, setVisible } = useToolbar();

  createEffect(() => {
    setVisible({
      group: state.images.length > 0,
      load: state.images.length > 0,
      remove: state.images.length > 0,
    });
  });

  return (
    <>
      <Header />
      <Main>
        <Show
          when={state.images.length > 0}
          fallback={
            <div class={styles.emptyImageContent}>
              <div class={styles.emptyImageWrapper}>
                <EmptyImage />
              </div>
              <Button icon={RoundedAdd} onClick={() => loadImages()}>
                画像を読み込む
              </Button>
            </div>
          }
        >
          {getSimilarImageGroups().length === 0 && (
            <Gallery images={state.images} />
          )}
          {getSimilarImageGroups().length > 0 && (
            <SimilarImageGallery similarImageGroups={getSimilarImageGroups()} />
          )}
        </Show>
      </Main>
    </>
  );
};

const dummyImages = [
  {
    base64:
      "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2iPPfCHghkDqG9BkBIQQ1M0DRKsQgIBIqutL9AKS+g6BhxsCEKiXQEoZjigFJCUD1vto0BsEIFCEQOwb2GgEJNUQsogzUxYCEGiGQKzrU/ACErvCN+Pu9AoBCLgiEFOGJEgBickArpyUdiEAAf8JhL4BDkZAYg0B/XdxRggBCLgmEOr65r2AhK7Qrh2P9iEAgbgIhJRh8VJAQgIYl+syGwhAwCcCvm+gvRGQUEM4n5yNsUAAAnES8HV9bFxAfFfYON2RWUEAAj4Q+Pvvv+Wrr76SzTbbTEaPHt1xSEuWLJGlS5fKuHHjzP28GZoVK1bIiBEjzI/2M2rUqEHt//XXX7LGGmuYH71Wrlxp+tFya6211qCyCxculHXXXVc22GCDQZ83IiB5AfhgYMYAAQhAoBcCH3zwgey0007y+uuvy8EHH9xq6vbbb5frrrvO/P7rr7/KJZdcIjfddJOsueaa5rNvvvlGjjnmGHn77bfN7zvssIM88cQTsttuu7Xa6LYBv/POO+XCCy80Zc8++2y57777Bk3j1ltvlUsvvXTY1N59913ZddddzeevvfaaTJs2TX7++WczxiOPPFIefvhh2Xjjjc392gTE1xCsF8egLgQgAIFuBP744w/ZY489REVk7ty5svfee5vijz32mJxzzjkye/Zss1jroq3icvfdd8upp54qGj1MmDBBDjnkELn33nvN7xdddJG8/PLLsmDBgmHRSqf1VSMaFaMZM2bIpptuKioY7ddVV10lGt1kn//zzz/y008/mbIjR46UDz/8UCZOnGgEQ0Xku+++kyOOOMKI4axZs+oREFJUPGAQgECqBKZOnSpffPGFaApIo4c999zToNh///3Nbv6yyy5robn//vvlwQcflHfeeUdeffVVE31oFLLeeuuZMioiG220kWlH667uGprhueaaa0z0ooLRfp1xxhmyzTbbDBpD+/2rr77aiN4rr7zS+nhgYEB22WUX0XV9ww03dBOBkKJK9XFh3hCAQEZAIwcViPfff18OPfTQloBoVKLnCW+++absu+++LWCff/65bLvttkYorr/++mGLtxacPn26iUzOO+88Oe644+Swww6Tc88917Rx1113mTpPPvlk61xDF/ozzzzTpJw0XdXf3y99fX2m/KRJk+Too482Y/v6669lq622ks0337w1HhW5o446aliaa4sttpBnnnlG9tprr+oEhBQVDw4EIACB/wi89dZbst9++7VEYrvttmsJyGeffSb6+/fff986S9A6eqitqaNPP/3UnIWsv/76oucY7dfNN98sH3/8sUkrvffee3LQQQfJnDlzzCG5psBUQDTF1H6ddtppRhj0HEQFRS8VEk1H/fDDD+ZP0Y8fP960c9JJJ5m29SBdU1kPPPCAEZn2S0Xr5JNPFo2uej4DIUXFIwMBCEBgFQFNV+lBt55nTJ482dxoF5BPPvnEpJR04VbByK5MQDSFpXW1zJVXXjkI7S233CLz5s2T559/3nz+0EMPyY033mj+fe2115qFfeilAqLRRZbCyjJEhx9+uJxwwgkmghk7dqxJs+mZh7ZzwQUXGAF5+umn5cADDxwmIJpCO//888sJCCkqHhcIQAACnQnoOYe+taSH19l1+eWXyymnnGLOMGbOnGmiC00btaeMMmFZtGiRPProo6KRip6LtF+669dXae+55x7zsaa7tA2NGDQFNvT1Wy0zVEDa2xsaANxwww3mIP2pp54yEYr2d+KJJw4agwqLvtF17LHH5hcQUlQ8LhCAAATsBPT13Ow7GFlpPQs566yzzOKvkYCeL6jA6NtN2aVnFxdffLF8+eWX8tJLL5ny+u/sexqaptpxxx3liiuuMAu7Xvrqr0Ys2p+ms/TsxBaB6H2NdjTdtfvuu8uYMWNa/6Oipqv0YF3PU+644w5ZvHixSWlll4relltuKSp222+/vV1ASFHZHYYSEIAABLoR0F37iy++aA6e9dLUk4rKCy+8YF7j1dd5NVLQz/T1Xj1o33nnnc1Bt75F9csvv5hF/fHHHzdvdemi/9xzzxkB+uijj8wZiIpLpze0VGxUFDQ1lV2///67OYzfZ599zOvBW2+9tYk6VNT0VWG9N3/+fDn++ONNFKTRk76KrOPTt8K0rF4dz0BIUfEwQAACEKiOgL65pIu7Rh566be+9ZxDX5XVL+htsskmJvrQxTy79DD99NNPlzfeeMN8dMABB8gjjzxixEAXbv39tttuM6kkvTSC0ehED/BVsLJrypQppk72pcX29vVtLo129NI3wPQ7Ifp2V3Y9++yz5jxEIw+99IxFD9bXWWedwQKihyhZtKF39JRef4Z+/b06pLQEAQhAIG0CKiR65qDfqVjdpdGI/jkSjTpcXJr+Wr58eev13k596NtaWkYjoXZ90BTXiIGBgZXaiH5zUQeJaLgwE21CAAIQCJ+Anofr38xatmyZeYvsX1B0kw/w0NHJAAAAAElFTkSuQmCC",
    filePath: "/Users/t-yng/Pictures/X-T30Ⅱ/DSCF0800.JPG",
  },
];

export default Home;

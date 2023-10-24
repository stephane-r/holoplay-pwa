import { Skeleton } from "@mantine/core";
import { type FC, type ImgHTMLAttributes, memo, useState } from "react";

export const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = memo(
  ({ src, className, alt, ...props }) => {
    const [loading, setLoading] = useState(true);

    return (
      <>
        <Skeleton
          visible={loading}
          style={{
            display: loading ? "inherit" : "none",
            width: "100%",
            height: "100%",
          }}
          className={className}
        />
        <img
          src={src}
          alt={alt}
          className={className}
          style={
            loading
              ? {
                  height: 0,
                }
              : undefined
          }
          onLoad={() => setLoading(false)}
        />
      </>
    );
  },
);

import { Skeleton } from "@mantine/core";
import { memo, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image: React.FC<ImageProps> = memo(
  ({ className, alt, ...props }) => {
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
          {...props}
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
  }
);

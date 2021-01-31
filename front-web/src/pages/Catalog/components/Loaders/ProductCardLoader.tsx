import React from "react"
import ContentLoader from "react-content-loader"
import { genarateList } from "../../../../core/utils/list"

const listLoader = genarateList(3);

const ProductCardLoader = () => {
  return (
    <>
      {listLoader.map(item => (
        <ContentLoader
          key={item}
          speed={1}
          width={250}
          height={335}
          viewBox="0 0 250 335"
          backgroundColor="#ecebeb"
          foregroundColor="#d6d2d2"

        >
          <rect x="0" y="0" rx="2" ry="2" width="250" height="335" />
        </ContentLoader>
      ))}

    </>
  )
}

export default ProductCardLoader;
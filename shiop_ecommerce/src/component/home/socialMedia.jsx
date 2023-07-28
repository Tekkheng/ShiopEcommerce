/* eslint-disable react/prop-types */
const SocialMedia = ({Logo, Target}) => {

  return (
    <>
        <a
          className="btn btn-link btn-floating btn-lg text-dark m-1 ty" target="_blank" rel="noreferrer"
          href={Target}
          role="button"
          data-mdb-ripple-color="dark"
          ><Logo className="logo"/>
        </a>
    </>
  )
}

export default SocialMedia
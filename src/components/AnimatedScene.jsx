function PalmTree({ className, mirrored = false }) {
  return (
    <div className={`scene__palm ${className}${mirrored ? " scene__palm--mirrored" : ""}`}>
      <svg className="scene__palm-svg" viewBox="0 0 240 520" role="presentation">
        <g className="scene__palm-motion">
          <path
            className="scene__trunk-path"
            d="M132 518C123 432 118 346 122 270C125 222 136 183 149 139C156 113 161 89 160 66C134 92 114 131 102 181C89 233 87 300 92 518H132Z"
          />

          <g className="scene__canopy">
            <path
              className="scene__frond-path"
              d="M132 154C98 126 59 105 18 93C54 120 87 151 114 190C118 176 123 164 132 154Z"
            />
            <path
              className="scene__frond-path"
              d="M132 158C92 149 51 149 10 163C54 171 93 178 122 190C123 179 126 168 132 158Z"
            />
            <path
              className="scene__frond-path"
              d="M132 160C95 178 60 206 27 244C76 225 110 204 138 178C136 172 134 166 132 160Z"
            />
            <path
              className="scene__frond-path"
              d="M132 154C147 118 154 74 148 24C138 69 132 113 128 158C129 157 130 155 132 154Z"
            />
            <path
              className="scene__frond-path"
              d="M132 156C159 126 193 106 228 98C194 122 165 151 143 188C140 176 137 165 132 156Z"
            />
            <path
              className="scene__frond-path"
              d="M132 158C168 148 204 145 238 154C201 170 168 181 142 192C141 180 138 169 132 158Z"
            />
            <path
              className="scene__frond-path"
              d="M132 160C160 176 190 203 222 242C179 222 149 202 127 182C128 174 129 167 132 160Z"
            />

            <path className="scene__frond-vein" d="M132 154C96 129 58 107 24 95" />
            <path className="scene__frond-vein" d="M132 158C96 155 56 156 16 164" />
            <path className="scene__frond-vein" d="M132 160C101 182 67 208 33 239" />
            <path className="scene__frond-vein" d="M132 154C142 119 146 79 146 33" />
            <path className="scene__frond-vein" d="M132 156C162 130 194 109 223 100" />
            <path className="scene__frond-vein" d="M132 158C166 152 199 151 232 156" />
            <path className="scene__frond-vein" d="M132 160C159 179 189 204 217 237" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function AnimatedScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene__sun-aura" />
      <div className="scene__sun-glow" />
      <div className="scene__sun-disc" />
      <div className="scene__sun-trail" />
      <div className="scene__light-haze scene__light-haze--left" />
      <div className="scene__light-haze scene__light-haze--right" />

      <PalmTree className="scene__palm--far-left scene__palm--small" />
      <PalmTree className="scene__palm--left scene__palm--large" />
      <PalmTree className="scene__palm--right scene__palm--large" mirrored />
      <PalmTree className="scene__palm--far-right scene__palm--small" mirrored />

      <div className="scene__wave scene__wave--back" />
      <div className="scene__wave scene__wave--mid" />
      <div className="scene__wave scene__wave--front" />
      <div className="scene__foam scene__foam--one" />
      <div className="scene__foam scene__foam--two" />
    </div>
  );
}
